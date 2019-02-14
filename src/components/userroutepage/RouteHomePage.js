import React, { Component } from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {getUserRoutes} from '../../actions/routes';
import {getCurrentConditions, getPollenCount} from '../../actions/breezeometer'
import UserNavBar from '../userhomepage/UserNavBar';
// import GoogleMap from '../googlemaps/GoogleMap';
// import LocationListing from './LocationListing';
// import CreateLocation from './CreateLocation';
// import LocationHomeBar from './LocationHomeBar';
// import AirQualityHomePage from '../breezeometer/AirQualityHomePage';

const breezeApi = process.env.REACT_APP_BREEZE_O_METER_API_KEY;
const conditionsUrl = process.env.REACT_APP_BREEZE_O_METER_CURRENT_CONDITIONS_URL;
const pollenUrl = process.env.REACT_APP_BREEZE_O_METER_POLLEN_URL;

class UserRoutesPage extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        this.props.getUserRoutes(this.props.match.params.userId);
    }

    render() {
        console.log(this.props.routes)
        return (
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName} />
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserRoutes},dispatch)
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