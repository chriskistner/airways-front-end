import React, { Component } from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {getUserRoutes, deleteUserRoute} from '../../actions/routes';
import {getUserLocations} from '../../actions/locations';
import SiteHeader from '../static/Header';
import UserNavBar from '../userhomepage/UserNavBar';
import GoogleMap from '../googlemaps/GoogleMap';
import RouteListing from './RouteListing';
import CreateRoute from './CreateRoute';
import RouterHomeBar from './RouterHomeBar';
import AirQualityHomePage from '../breezeometer/AirQualityHomePage';

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
            currentPoint: null,
            currentCond: null,
            currentPollen: null,
        }
    };

    componentDidMount() {
        this.props.getUserRoutes(this.props.match.params.userId);
        this.props.getUserLocations(this.props.match.params.userId);
    };

    noRoutes = () => {
        return (
            <Row className='noMargin bg-light'>
                <Col>
                    <b>You Have No Saved Routes...</b>
                </Col>
            </Row>
        )
    };

    toggleCreateForm = () => {
        this.setState({
            form: !this.state.form
        })
    };

    setDisplayedConditions = (lat, long) => {
        return axios.get(`${conditionsUrl}lat=${lat}&lon=${long}&key=${breezeApi}&features=breezometer_aqi,local_aqi,pollutants_concentrations,pollutants_aqi_information`,{})
 
    };

    setDisplayedPollen = (lat, long) => {
        return axios.get(`${pollenUrl}lat=${lat}&lon=${long}&days=1&key=${breezeApi}`,{})
    };

    fetchAirQualityData = async (lat, long) => {
        try {
            const conditions = await this.setDisplayedConditions(lat, long);
            const pollen = await this.setDisplayedPollen(lat, long);
            return {pollen: pollen.data.data, air: conditions.data.data}
        }catch(err) {
            console.log(err)
        }
    };

    handleRouteSelecton = async (name, polyline) => {
        try {
            const lat = polyline[0][0];
            const long = polyline[0][1];
            const conditions = await this.fetchAirQualityData(lat, long);
            this.setState({
                currentRouteName: name,
                currentRoute: polyline,
                currentCond: conditions.air,
                currentPollen: conditions.pollen
            })
        }catch(err) {
            console.log(err)
        }
    };

    handlePointSelection = async (obj) => {
        try {
            const lat = obj.lat;
            const long = obj.lng;
            const conditions = await this.fetchAirQualityData(lat, long);
            this.setState({
                currentPoint: obj,
                currentCond: conditions.air,
                currentPollen: conditions.pollen
            })
        }catch(err) {
            console.log(err)
        }
    };

    render() {
        const routes = this.props.routes;
        let coordinates = [];
        let pollenData = null;
        let airData = null;

        if(this.state.currentRoute) {
            for (let points of this.state.currentRoute) {
                coordinates.push({lat: points[0], lng: points[1] })
            }
        } 
        else if(routes.length !== 0){
            for (let points of routes[0].polyline) {
                coordinates.push({lat: points[0], lng: points[1] })
            }
        }
        else {coordinates = {lat: this.props.homeLat, lng: this.props.homeLong}};

        if(this.state.currentCond) {
            pollenData = this.state.currentPollen;
            airData = this.state.currentCond;

        } else if (routes.length !== 0) {
            pollenData = this.props.loadPollen;
            airData = this.props.loadConditions;
        } else { 
            pollenData = this.props.homePollen;
            airData = this.props.homeConditions;
        };

        return (
            <Container>
                <SiteHeader userName={this.props.userName} newUser={this.toggleModal} />
                <Row>
                    <Col className='Cell'>
                        <UserNavBar user={this.props.userName} />
                        <RouterHomeBar toggleForm={this.toggleCreateForm}/>
                        {this.state.form ? <CreateRoute userLocations={this.props.locations}
                                                        userHome={[this.props.homeLat, this.props.homeLong,]} 
                                                        toggleForm ={this.toggleCreateForm}/> : null}
                        <Row className="noMargin bg-light">
                            <Col xs='3' className="noPadding cellBorder" style={{minHeight: 400}}>
                            {
                                routes.length === 0 ? this.noRoutes() 
                                : 
                                routes.map(route => {return <RouteListing key={route.id} {...route} 
                                    userId ={this.props.match.params.userId}
                                    selectRoute={this.handleRouteSelecton}
                                    dropRoute={this.props.deleteUserRoute}/>})
                            }
                            </Col>
                            <Col xs='4' className="noPadding cellBorder">
                                {pollenData ? <AirQualityHomePage pollen={pollenData} 
                                                    conditions={airData}/> : <p>loading...</p>}
                            </Col>
                            <Col xs='5' className="noPadding cellBorder">
                                {
                                    coordinates !== [] ? 
                                        <GoogleMap currentName={this.state.currentLocName}
                                        coordinates={coordinates}
                                        setCurrentPoint={this.handlePointSelection}
                                        google={this.props.google}/> :
                                        <p>loading...</p>
                                    }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserRoutes, deleteUserRoute, getUserLocations},dispatch)
};

const mapStateToProps = (state) => {
    return {
        userName: state.routes.userName,
        homeLat: state.routes.zipLat,
        homeLong: state.routes.zipLong,
        routes: state.routes.routes,
        homeConditions: state.routes.homeConditions,
        homePollen: state.routes.homePollen,
        loadConditions: state.routes.loadConditions,
        loadPollen: state.routes.loadPollen,
        locations: state.locations.locations 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoutesPage);