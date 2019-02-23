import React, { Component } from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Form, Label, Input, FormGroup, ButtonGroup} from 'reactstrap';
import {createUserRoute} from '../../actions/routes';
import GoogleMap from '../googlemaps/GoogleMap';

const googleUrl = process.env.REACT_APP_GOOGLE_GEOCODE_URL
const key = process.env.REACT_APP_GOOGLE_API_KEY

class CreateRoute extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            newRouteName: '',
            points: [],
            mapPoints: [],
            pointDetails: []
        }
    };

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
    };

    addPointToRoute = async (event) => {
        event.preventDefault()
        const {newPointAddress, newPointCity, newPointState} = event.target
        try {
            const formatAddress = newPointAddress.value.replace(/ /g, '+') || '';
            const formatState = newPointState.value.toUpperCase();
            const formatCity = newPointCity.value.replace(/ /g, '+');

            const response = await axios.get(`${googleUrl}${formatAddress},+${formatCity},+${formatState}&key=${key}`,{});
            const pointCoords = [response.data.results[0].geometry.location.lat, 
                response.data.results[0].geometry.location.lng];
            const mapCoords = {
                lat: response.data.results[0].geometry.location.lat, 
                lng: response.data.results[0].geometry.location.lng 
            };
            const pointInfo = {address: newPointAddress.value, 
                city: newPointCity.value, 
                state: newPointState.value
            }
            this.setState({
                points: [...this.state.points, pointCoords],
                mapPoints: [...this.state.mapPoints, mapCoords],
                pointDetails: [...this.state.pointDetails, pointInfo]
            })
            newPointAddress.value = '';
            newPointCity.value = '';
            newPointState.value = '';
        }catch(err) {
            console.log(err)
        }
    };

    addLocationToRoute = (event) => {
        const location = this.props.userLocations.filter(point => parseInt(event.target.value) === point.id);
        const pointName = location[0].name;
        console.log(location[0])
        const latitude = parseFloat(location[0].latitude);
        const longitude = parseFloat(location[0].longitude);
        console.log(latitude);
        const pointCoords = [latitude, longitude];

        const mapCoords = {lat: latitude, lng: longitude};

        const pointInfo = {address: pointName, 
            city: '', 
            state: ''
        };
        this.setState({
            points: [...this.state.points, pointCoords],
            mapPoints: [...this.state.mapPoints, mapCoords],
            pointDetails: [...this.state.pointDetails, pointInfo]
        })
    };

    handleCreateRoute = () => {
        this.props.createUserRoute(this.props.match.params.userId, 
            this.state.newRouteName,
            this.state.points);

        this.setState({
            newRouteName: '',
            points: [],
            mapPoints: [],
            pointDetails: []
        })
        this.props.toggleForm()
    };

    clearRoutePoints = () => {
        this.setState({
            points: [],
            mapPoints: [],
            pointDetails: []
        })
    }

    generatePointDetails = (arr) => {
        return (
            <ul>
                <span><i>Route Begins At...</i></span>
                {arr.map(point => <li>{point.address} {point.city}, {point.state}</li>)}
            </ul>
        )
    };

    generateStoredLocations = (obj) => {
        return (
        <option id={obj.id} value={obj.id}>{obj.name}</option>
        )
    };

    noPoints = () => {
        return(
            <b>Add a Starting Location for Your Route</b>
        )
    };

    render() {
        const points = this.state.pointDetails;
        console.log(this.state.mapPoints)
        return (
            <Row className="noMargin bg-light">
                <Col className="noPadding cellBorder">
                    <Form onSubmit={this.addPointToRoute}>
                        <Row className="noMargin">
                            <Col xs="3" className="noPadding">
                                <Input className="createRouteInputs" type="text" name="newRouteName" id="newRouteName" placeholder="Enter a Name for this Route" onChange={this.handleChange}></Input>
                            </Col>
                        </Row>
                        <Row className="noMargin justify-content-start">
                            <Col xs='5' className="noPadding">
                                <Input className="createRouteInputs" type="text" name="newPointAddress" id="newPointAddress" placeholder="Enter an Address for the start of your route"></Input>
                            </Col>
                            <Col xs='3' className="noPadding">
                                <Input className="createRouteInputs" type="text" name="newPointCity" id="newPointCity" placeholder="Enter City"></Input>
                            </Col>
                            <Col xs='2' className="noPadding">
                                <Input className="createRouteInputs" type="text" name="newPointState" id="newPointState" placeholder="Enter State"></Input>
                            </Col>
                        </Row>
                        <Row className="noMargin align-items-center">
                            {
                            this.props.userLocations.length !== 0 ?                         
                                    <Col xs="5" className="noPadding align-self-center">
                                        <FormGroup>
                                            <Input className="createRouteInputs" type="select" name="selectLocation" id="selectLocation" onChange={this.addLocationToRoute}>
                                            <option id={0} value={'base'} selected disabled>Or Select From Your Saved Locations...</option>
                                            {
                                            this.props.userLocations.map(points => this.generateStoredLocations(points))
                                            }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                 : null
                            }
                            <Col xs="3" className="noPadding">
                                <Button outline color="primary" style={{marginLeft: 10, marginBottom: 5}}>{points.length !== 0 ? 'Add To Route' : 'Start New Route'}</Button>
                            </Col>
                        </Row>

                    </Form>
                        {
                        points.length !== 0 ? 
                            <Row className="noMargin align-items-center">
                                <Col xs="8" className="noPadding">
                                    { this.generatePointDetails(points)}
                                    <ButtonGroup style={{marginLeft: 5, marginBottom: 5}}>
                                        <Button outline color="success" onClick={() => this.handleCreateRoute()}>Save Route</Button>
                                        <Button outline color="danger" onClick={() => this.clearRoutePoints()} >Reset Points</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row> : null
                        }
                </Col>
                {
                    this.state.mapPoints.length !==0 ? <Col xs='4' className="noPadding cellBorder" style={{minHeight: 250}}>
                            <GoogleMap coordinates={this.state.mapPoints} google={this.props.google} /> 
                        </Col>: null
                }
            </Row>
        )
    }
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({createUserRoute}, dispatch)


export default withRouter(connect(null, mapDispatchToProps)(CreateRoute))
