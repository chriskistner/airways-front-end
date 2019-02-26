import React, { Component } from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {getUserLocations, deleteUserLocation} from '../../actions/locations';
import {getCurrentConditions, getPollenCount} from '../../actions/breezeometer';
import SiteHeader from '../static/Header';
import UserNavBar from '../userhomepage/UserNavBar';
import GoogleMap from '../googlemaps/GoogleMap';
import LocationListing from './LocationListing';
import CreateLocation from './CreateLocation';
import LocationHomeBar from './LocationHomeBar';
import AirQualityHomePage from '../breezeometer/AirQualityHomePage';

const breezeApi = process.env.REACT_APP_BREEZE_O_METER_API_KEY;
const conditionsUrl = process.env.REACT_APP_BREEZE_O_METER_CURRENT_CONDITIONS_URL;
const pollenUrl = process.env.REACT_APP_BREEZE_O_METER_POLLEN_URL;

class UserLocationsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            createLoc: false,
            currentLocName: '',
            currentLocLat: null,
            currentLocLong: null,
            currentCond: null,
            currentPollen: null
        }
    };

    componentDidMount() {
        this.props.getUserLocations(this.props.match.params.userId);
    };

    noLocales = () => {
        return (
            <Row className='noMargin bg-light'>
                <Col>
                    <b>You Have No Saved Locations...</b>
                </Col>
            </Row>
        )
    };

    setLocalConditions = (long, lat) => {
        return axios.get(`${conditionsUrl}lat=${lat}&lon=${long}&key=${breezeApi}&features=breezometer_aqi,local_aqi,pollutants_concentrations,pollutants_aqi_information`,{})
 
    };

    setLocalPollen = (long, lat) => {
        return axios.get(`${pollenUrl}lat=${lat}&lon=${long}&days=1&key=${breezeApi}`,{})
    };

    handleLocationSelecton = async (name, lat, long) => {
        try{
            const conditions = await this.setLocalConditions(long, lat)
            const pollen = await this.setLocalPollen(long, lat)
            this.setState({
                currentLocName: name,
                currentLocLat: lat,
                currentLocLong: long,
                currentCond: conditions.data.data,
                currentPollen: pollen.data.data,
                
            })
        }catch(err) {
            console.log(err)
        }
    };

    toggleCreateForm = () => {
        this.setState({
            createLoc: !this.state.createLoc
        })
    };

    render () {
        const locations = this.props.locations;
        let pollenData = null;
        let airData = null;

        let coordinates = null;

        if(this.state.currentLocLat) {
            coordinates = {lat: this.state.currentLocLat, lng: this.state.currentLocLong}
        } else if (locations.length !== 0) {
            coordinates = {lat: locations[0].latitude, lng: locations[0].longitude}
        }
        else {
            coordinates = {lat: this.props.homeLat, lng: this.props.homeLong}
        };

        if(this.state.currentPollen) {
            pollenData = this.state.currentPollen;
            airData = this.state.currentCond;
        } else if (locations.length !== 0) {
            pollenData = this.props.loadPollen;
            airData = this.props.loadConditions
        }
        else { 
            pollenData = this.props.homePollen;
            airData = this.props.homeConditions
        };
        return (
            <Container>
                <SiteHeader userName={this.props.userName} newUser={this.toggleModal} />
                <Row>
                    <Col className='Cell'>
                        <UserNavBar user={this.props.userName}/>
                        <LocationHomeBar toggleForm={this.toggleCreateForm}/>
                        {this.state.createLoc ? <CreateLocation toggleForm ={this.toggleCreateForm}/> : null}
                        <Row className="noMargin bg-light">
                            <Col xs='3' className="noPadding cellBorder" style={{minHeight: 400}}>
                            {
                                locations.length === 0 ? this.noLocales() : locations.map(place => {return <LocationListing key={place.id} {...place} userId ={this.props.match.params.userId} deleteLoc={this.props.deleteUserLocation} setCurrent={this.handleLocationSelecton}/>})
                            }
                            </Col>
                            <Col xs='4' className="noPadding cellBorder">
                                {pollenData ? <AirQualityHomePage pollen={pollenData} 
                                                    conditions={airData}/> : null}
                            </Col>
                            <Col xs='5' className="noPadding cellBorder">
                                {
                                    coordinates.lat ? 
                                        <GoogleMap currentName={this.state.currentLocName}
                                        coordinates={coordinates}
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
    return bindActionCreators({getUserLocations, deleteUserLocation, getCurrentConditions, getPollenCount},dispatch)
};

const mapStateToProps = (state) => {
    return {
        userName: state.locations.userName,
        homeLat: state.locations.zipLat,
        homeLong: state.locations.zipLong,
        homeConditions: state.locations.homeConditions,
        homePollen: state.locations.homePollen,
        loadConditions: state.locations.loadConditions,
        loadPollen: state.locations.loadPollen,
        locations: state.locations.locations,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationsPage)
