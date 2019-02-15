import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import {getGeoCode} from '../../actions/google'
import { Container, Row, Col } from 'reactstrap';
import UserNavBar from './UserNavBar';
import GoogleMap from '../googlemaps/GoogleMap';
import AirQualityHomePage from '../breezeometer/AirQualityHomePage';

class UserHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.userId);
    }

    render() {
        let coordinates={lat: this.props.homeLat, lng: this.props.homeLong};
        return (
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="5" style={{padding: 0}}>
                        <AirQualityHomePage pollen={this.props.homePollen} conditions={this.props.homeConditions}/>
                    </Col>
                    <Col xs="7" style={{padding: 0}}>
                    {
                        coordinates.lat ? 
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
    return bindActionCreators({setAuthentication, getUser, getGeoCode},dispatch)
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        homeLat: state.auth.zipLat,
        homeLong: state.auth.zipLong,
        homeConditions: state.auth.homeConditions,
        homePollen: state.auth.homePollen
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
