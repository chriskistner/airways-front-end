import React, { Component } from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Form, Label, Input} from 'reactstrap';
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

    addPointToRoute = async (event) => {
        event.preventDefault()
        const {newRouteName,newPointAddress, newPointCity, newPointState} = event.target
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
                newRouteName: newRouteName.value,
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

    generatePointDetails = (arr) => {
        return (
            <ul>
                <span><i>Route Begins At...</i></span>
                {arr.map(point => <li>{point.address} {point.city}, {point.state}</li>)}
                {arr.length > 1 ? <span><i>Route Ends At...</i></span> : null}
            </ul>
        )
    };

    noPoints = () => {
        return(
            <b>Add a Starting Location for Your Route</b>
        )
    };

    render() {
        const points = this.state.pointDetails;
        console.log(this.state.newRouteName)
        console.log(this.state.points)
        return (
            <Row>
                <Col style={{borderWidth: 1, borderStyle: 'solid', borderColor: 'gray'}}>
                    <Form onSubmit={this.addPointToRoute}>
                        <Row>
                            <Col>
                                <Label>Enter A Location</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='3'>
                                <Input type="text" name="newRouteName" id="newRouteName" placeholder="Enter a Name for this Route"></Input>
                            </Col>
                            <Col xs='4'>
                                <Input type="text" name="newPointAddress" id="newPointAddress" placeholder="Enter Address"></Input>
                            </Col>
                            <Col xs='2'>
                                <Input type="text" name="newPointCity" id="newPointCity" placeholder="Enter City"></Input>
                            </Col>
                            <Col xs='2'>
                                <Input type="text" name="newPointState" id="newPointState" placeholder="Enter State"></Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Button>Add To Route</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col xs="9">
                        {
                            points.length === 0 ? this.noPoints() : this.generatePointDetails(points)
                        }
                        </Col>
                        <Col xs='3'>
                            <Button onClick={() => this.handleCreateRoute()}>Save Route</Button>
                        </Col>
                    </Row>
                </Col>
                {
                    this.state.mapPoints.length !==0 ? <Col xs='4' style={{minHeight: 400, paddingRight: 0}}>
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
