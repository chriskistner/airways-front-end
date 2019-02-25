import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createUser} from '../../actions/authentication';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateUserForm extends Component{
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleCreateUser = (event) => {
        event.preventDefault();
        this.props.createUser(event.target.newUserName.value, 
            event.target.newUserEmail.value,
            event.target.newUserPassword.value,
            event.target.newUserAddress.value,
            event.target.newUserCity.value,
            event.target.newUserState.value,
            () => this.props.history.push(`/user/${this.props.userId}/`)
            );
    }


    render() {
        return (
                <Modal isOpen={this.props.modalStatus} toggle={this.props.newUser}>
                    <ModalHeader>
                        <b>CREATE AN ACCOUNT</b>
                    </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleCreateUser}>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="newUserName">User Name</Label>
                                            <Input type="text" name="newUserName" id="newUserName" placeholder="create a user name for your account"></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="newUserEmail">User Email</Label>
                                            <Input type="text" name="newUserEmail" id="newUserEmail" placeholder="enter a valid email account"></Input>
                                            <FormFeedback>Sorry, that email is already being used</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="newUserPassword">User Password</Label>
                                            <Input type="password" name="newUserPassword" id="newUserPassword" placeholder="enter password"></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="newUserEmail">User Home Address</Label>
                                            <Input type="text" name="newUserAddress" id="newUserAddress" placeholder="Street Address"></Input>
                                            
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-start">
                                    <Col xs="8">
                                        <Input type="text" name="newUserCity" id="newUserCity" placeholder="City" style={{width: 300}}></Input>
                                    </Col>
                                    <Col xs='4' className="mb-2 noPadding">
                                        <Input type="text" name="newUserState" id="newUserState" placeholder="State" style={{width: 100}} maxlength="2"></Input>
                                    </Col>
                                </Row>
                                <Button outline color="success">Create Account</Button>
                            </Form>
                        </ModalBody>
                </Modal>
        )
    }
};

const mapStateToProps = state => ({
    userId: state.auth.userId,
    errors: state.auth.errors
  })

  const mapDispatchToProps = dispatch =>
    bindActionCreators({createUser}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUserForm))