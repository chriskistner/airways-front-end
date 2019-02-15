import React, { Component } from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {getUserRoutes, deleteUserRoute} from '../../actions/routes';
import {getCurrentConditions, getPollenCount} from '../../actions/breezeometer'
import UserNavBar from '../userhomepage/UserNavBar';
import GoogleMap from '../googlemaps/GoogleMap';
import RouteListing from './RouteListing';
import CreateRoute from './CreateRoute';
import RouterHomeBar from './RouterHomeBar';
// import AirQualityHomePage from '../breezeometer/AirQualityHomePage';

const breezeApi = process.env.REACT_APP_BREEZE_O_METER_API_KEY;
const conditionsUrl = process.env.REACT_APP_BREEZE_O_METER_CURRENT_CONDITIONS_URL;
const pollenUrl = process.env.REACT_APP_BREEZE_O_METER_POLLEN_URL;

class UserRoutesPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form: false,
            currentRouteName: '',
            currentRoute: null,
        }
    }

    componentDidMount() {
        this.props.getUserRoutes(this.props.match.params.userId);
    };

    noRoutes = () => {
        return (
            <Row>
                <Col>
                    <h4>You Have No Saved Routes</h4>
                </Col>
            </Row>
        )
    };

    toggleCreateForm = () => {
        this.setState({
            form: !this.state.form
        })
    };

    handleRouteSelecton = (name, polyline) => {
        this.setState({
            currentRouteName: name,
            currentRoute: polyline
        })
    };

    render() {
        const routes = this.props.routes
        let coordinates = [];

        if(this.state.currentRoute) {
            for (let points of this.state.currentRoute) {
                coordinates.push({lat: points[0], lng: points[1] })
            } 
        } else coordinates = {lat: this.props.homeLat, lng: this.props.homeLong}
        console.log(coordinates)
        return (
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName} />
                    </Col>
                </Row>
                <RouterHomeBar toggleForm={this.toggleCreateForm}/>
                {this.state.form ? <CreateRoute toggleForm ={this.toggleCreateForm}/> : null}
                <Row>
                    <Col xs='3' style={{minHeight: 400, paddingRight: 0}}>
                    {
                        routes.length === 0 ? this.noRoutes() 
                        : 
                        routes.map(route => {return <RouteListing key={route.id} {...route} 
                            userId ={this.props.match.params.userId}
                            selectRoute={this.handleRouteSelecton}
                            dropRoute={this.props.deleteUserRoute}/>})
                    }
                    </Col>
                    <Col xs='5' style={{paddingRight: 0}}>
                        {
                            coordinates !== [] ? 
                                <GoogleMap currentName={this.state.currentLocName}
                                coordinates={coordinates}
                                google={this.props.google}/> :
                                <p>loading...</p>
                            }
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserRoutes, deleteUserRoute},dispatch)
}

const mapStateToProps = (state) => {
    return {
        userName: state.routes.userName,
        homeLat: state.routes.zipLat,
        homeLong: state.routes.zipLong,
        routes: state.routes.routes
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRoutesPage)