import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import {getUserLocations} from '../../actions/locations';
import {getUserRoutes} from '../../actions/routes';
import {getUserAlerts, createUserAlert, deleteUserAlert} from '../../actions/alerts';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button,} from 'reactstrap';
import UserNavBar from '../userhomepage/UserNavBar';
import CreateAlert from './CreateAlert';
import AlertHomeBar from './AlertHomeBar';
import AlertListing from './AlertListing';
import {sendTestEmail} from '../../actions/alerts';

class UserAlertsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: false
        }
    };

    componentDidMount() {
        this.props.getUserRoutes(this.props.match.params.userId);
        this.props.getUser(this.props.match.params.userId);
        this.props.getUserAlerts(this.props.match.params.userId);
        this.props.getUserLocations(this.props.match.params.userId);
    };

    toggleCreateForm = () => {
        this.setState({
            form: !this.state.form
        })
    };

    noAlerts = () => {
        return (
            <Row>
                <Col>
                    <h4>You Have No Saved Alerts</h4>
                </Col>
            </Row>
        )
    };

    handleSendEmail = (event) => {
        event.preventDefault();
        const email = this.props.userEmail;
        const user = this.props.userName;
        const message = event.target.testMessage.value
        this.props.sendTestEmail(this.props.match.params.userId, user, email, message);
        event.target.testMessage.value = '';
    };

    render() {
        const alerts = this.props.alerts
        console.log(alerts)
        return(
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName}/>
                    </Col>
                </Row>
                <AlertHomeBar toggleForm={this.toggleCreateForm}/>
                {
                this.state.form ? <CreateAlert locations={this.props.locations} routes={this.props.routes}/> : null
                }
                {
                    alerts.length === 0 ? this.noAlerts() 
                    : 
                    alerts.map(alert => {return <AlertListing key={alert.id} {...alert} 
                        userId ={this.props.match.params.userId}
                        dropAlert={this.props.deleteUserAlert}
                        />})
                }
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setAuthentication, 
        getUser, 
        getUserAlerts,
        getUserLocations,
        getUserRoutes, 
        createUserAlert,
        deleteUserAlert, 
        sendTestEmail},dispatch)
};

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        userEmail: state.auth.email,
        userAddress: state.auth.address,
        userCity: state.auth.city,
        userState: state.auth.state,
        homeLat: state.auth.zipLat,
        homeLong: state.auth.zipLong,
        locations: state.locations.locations,
        routes: state.routes.routes,
        alerts: state.alerts.alerts
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAlertsPage);