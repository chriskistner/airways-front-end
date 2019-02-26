import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import {getUserLocations} from '../../actions/locations';
import {getUserRoutes} from '../../actions/routes';
import {getUserAlerts, createUserAlert, deleteUserAlert} from '../../actions/alerts';
import { Container, Row, Col} from 'reactstrap';
import SiteHeader from '../static/Header';
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
            <Row className="noMargin bg-light">
                <Col className="cellBorder">
                    <b>You Have No Saved Alerts...</b>
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
        return(
            <Container>
                <SiteHeader userName={this.props.userName} newUser={this.toggleModal} />
                <Row>
                    <Col className='Cell'>
                        <Row className="noOverlap">
                            <Col>
                                <UserNavBar user={this.props.userName}/>
                            </Col>
                        </Row>
                        <AlertHomeBar toggleForm={this.toggleCreateForm}/>
                        {
                        this.state.form ? <CreateAlert locations={this.props.locations} 
                                                        toggleForm={this.toggleCreateForm} 
                                                        routes={this.props.routes}
                                                        userHome={[this.props.homeLat, this.props.homeLong]}/> : null
                        }
                        {
                        alerts.length === 0 ? this.noAlerts() 
                        : 
                        alerts.map(alert => {return <AlertListing key={alert.id} {...alert} 
                            userId ={this.props.match.params.userId}
                            dropAlert={this.props.deleteUserAlert}
                            />})
                        }
                    </Col>
                </Row>
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