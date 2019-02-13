import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {getUserLocations} from '../../actions/locations';
import {getCurrentConditions, getPollenCount} from '../../actions/breezeometer'
import UserNavBar from '../userhomepage/UserNavBar';
import GoogleMap from '../googlemaps/GoogleMap';
import LocationListing from './LocationListing';
import CreateLocation from './CreateLocation';
import LocationHomeBar from './LocationHomeBar';
import AirQualityHomePage from '../breezeometer/AirQualityHomePage';

class UserLocationsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            createLoc: false,
            currentLocName: '',
            currentLocLat: null,
            currentLocLong: null,
        }
    };

    componentDidMount() {
        this.props.getUserLocations(this.props.match.params.userId);
    };

    noLocales = () => {
        return (
            <Row>
                <Col>
                    <h4>You Have No Saved Locations</h4>
                </Col>
            </Row>
        )
    };

    handleLocationSelecton = (name, lat, long) => {
        this.setState({
            currentLocName: name,
            currentLocLat: lat,
            currentLocLong: long
        })
    };

    toggleCreateForm = () => {
        this.setState({
            createLoc: !this.state.createLoc
        })
    };

    render () {
        const locations = this.props.locations
        return (
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName}/>
                    </Col>
                </Row>
                <LocationHomeBar toggleForm={this.toggleCreateForm}/>
                {this.state.createLoc ? <CreateLocation toggleForm ={this.toggleCreateForm}/> : null}

                <Row style={{borderWidth: 1, borderStyle: 'solid', borderColor: 'gray'}}>
                    <Col xs='3' style={{minHeight: 400, paddingRight: 0}}>
                    {
                        locations.length === 0 ? this.noLocales() : locations.map(place => {return <LocationListing key={place.id} {...place} setCurrent={this.handleLocationSelecton}/>})
                    }
                    </Col>
                    <Col xs='4'>
                        <AirQualityHomePage pollen={this.props.homePollen} conditions={this.props.homeConditions}/>
                    </Col>
                    <Col xs='5' style={{paddingRight: 0}}>
                        <GoogleMap currentName={this.state.currentLocName}
                                    currentLat={this.state.currentLocLat}
                                    currentLong={this.state.currentLocLong} 
                                    homeLat={this.props.homeLat} 
                                    homeLong={this.props.homeLong} 
                                    google={this.props.google}/>
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserLocations, getCurrentConditions, getPollenCount},dispatch)
}

const mapStateToProps = (state) => {
    return {
        userName: state.locations.userName,
        homeLat: state.locations.zipLat,
        homeLong: state.locations.zipLong,
        homeConditions: state.locations.homeConditions,
        homePollen: state.locations.homePollen,
        locations: state.locations.locations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationsPage)
