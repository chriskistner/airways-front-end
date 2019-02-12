import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {getUserLocations} from '../../actions/locations'
import UserNavBar from '../userhomepage/UserNavBar';
import GoogleMap from '../googlemaps/GoogleMap';
import LocationListing from './LocationListing';

class UserLocationsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLocName: '',
            currentLocLat: null,
            currentLocLong: null,
        }
    }

    componentDidMount() {
        this.props.getUserLocations(this.props.match.params.userId);
    }

    noLocales = () => {
        return (
            <Row>
                <Col>
                    <h3>You Have No Saved Locations</h3>
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
    }

    render () {
        const locations = this.props.locations
        return (
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs='4' style={{minHeight: 400, paddingRight: 0}}>
                    {
                        locations.length === 0 ? this.noLocales() : locations.map(place => {return <LocationListing key={place.id} {...place} setCurrent={this.handleLocationSelecton}/>})
                    }
                    </Col>
                    <Col xs='8' style={{paddingRight: 0}}>
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
    return bindActionCreators({getUserLocations},dispatch)
}

const mapStateToProps = (state) => {
    return {
        userName: state.locations.userName,
        homeLat: state.locations.zipLat,
        homeLong: state.locations.zipLong,
        locations: state.locations.locations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationsPage)
