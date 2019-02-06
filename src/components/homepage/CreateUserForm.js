import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthentication, login, createUser } from '../../actions/authentication';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateUserForm extends Component{
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <Modal isOpen={this.props.modalStatus} toggle={this.props.newUser}>
                <ModalHeader>
                <h1>Create Account</h1>
                </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="newUserName">User Name</Label>
                                <Input type="text" name="newUserName" id="newUserName" placeholder="create a user name for your account"></Input>
                                <FormFeedback>Sorry, that user name is already being used</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="newUserEmail">User Email</Label>
                                <Input type="text" name="newUserEmail" id="newUserEmail" placeholder="enter a valid email account"></Input>
                                <FormFeedback>Sorry, that email is already being used</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="newUserPassword">User Password</Label>
                                <Input type="password" name="newUserPassword" id="newUserPassword" placeholder="enter password"></Input>
                                <Input type="password" name="verifyPassword" id="verifyPassword" placeholder="verify password"></Input>
                                <FormFeedback>Sorry, those passwords don't match</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="newUserEmail">User Zip Code</Label>
                                <Input type="text" name="newUserZip" id="newUserZip" placeholder="enter your home zip code"></Input>
                                <FormFeedback>Sorry, that email is already being used</FormFeedback>
                            </FormGroup>
                            <ModalFooter>
                            <Button>Create Account</Button>
                            </ModalFooter>
                            
                        </Form>
                    </ModalBody>
            </Modal>

        )
    }
};

const mapStateToProps = state => ({
    userId: state.auth.userId
  })

  const mapDispatchToProps = dispatch =>
    bindActionCreators({
      setAuthentication,
      login,
      createUser
    }, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUserForm))