import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import {getUserAlerts, createUserAlert} from '../../actions/alerts';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button,} from 'reactstrap';
import UserNavBar from '../userhomepage/UserNavBar';
import {sendTestEmail} from '../../actions/alerts';

class UserAlertsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    };

    componentDidMount() {
        this.props.getUser(this.props.match.params.userId);
        this.props.getUserAlerts(this.props.match.params.userId)

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
        console.log(this.props.userEmail);
        return(
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs='6'>
                        <Form onSubmit={this.handleSendEmail}>
                        <FormGroup>
                                <Label for="newUserName">Send Test Email</Label>
                                <Input type="text" name="testMessage" id="testMessage" placeholder="Enter Test Message"></Input>
                            </FormGroup>
                            <Button>Send Test Email</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setAuthentication, getUser, getUserAlerts, createUserAlert, sendTestEmail},dispatch)
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
        userAlerts: state.alerts.alerts
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAlertsPage);