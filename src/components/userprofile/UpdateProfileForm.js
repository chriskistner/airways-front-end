import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Form, Label, Input} from 'reactstrap';

class UpdateProfile extends Component {
    constructor(props) {
        super(props) 
        this.state = {}
    };

    handleUpdateLocation = (event) => {
        event.preventDefault();
        this.props.createUserLocation(this.props.match.params.userId,
            event.target.newLocName.value,
            event.target.newLocAddress.value,
            event.target.newLocCity.value,
            event.target.newLocState.value)

            event.target.newLocName.value= '';
            event.target.newLocAddress.value='';
            event.target.newLocCity.value='';
            event.target.newLocState.value='';
        this.props.toggleForm()
    };

    render() {
        return (
            <Row className="noMargin mb-3 bg-light">
                <Col className="cellBorder createForm">
                    <Form onSubmit={this.handleCreateLocation}>
                        <Row>
                            <Col>
                                <Label>Enter New Home Address</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='4'>
                                <Input type="text" name="newLocAddress" id="newLocAddress" placeholder={this.props.userAddress}></Input>
                            </Col>
                            <Col xs='3'>
                                <Input type="text" name="newLocCity" id="newLocCity" placeholder={this.props.userCity}></Input>
                            </Col>
                            <Col xs='2'>
                                <Input type="text" name="newLocState" id="newLocState" placeholder={this.props.userState}></Input>
                            </Col>
                            <Col xs="3">
                                <Button outline color="success">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

        )
    }
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch)

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        userAddress: state.auth.address,
        userCity: state.auth.city,
        userState: state.auth.state,
        userEmail: state.auth.email
    }
};
    


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateProfile))