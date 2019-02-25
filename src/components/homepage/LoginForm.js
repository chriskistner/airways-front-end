import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthentication, login, createUser } from '../../actions/authentication';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';

class LoginForm extends Component{
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleLogin = (event) => {
        event.preventDefault();
        this.props.login(event.target.userEmail.value, event.target.userPassword.value,
            () => this.props.history.push(`/user/${this.props.userId}`))

    };

    render() {
        return (
            <Container>
                <Row id = "loginForm">
                    <Col className="cellHeight">
                        <Form onSubmit={this.handleLogin}>
                            {
                            this.props.errors ? <Alert color="danger">There was a problem logging in, check your user name and password.</Alert> : null
                            }
                            <FormGroup className="mt-1">
                                <Label for="userEmail">Email</Label>
                                <Input type="email" name="email" id="userEmail" placeholder="enter account email" />
                                <FormFeedback>Uh Oh, that username doesn't seem to exist</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="userPassword">Password</Label>
                                <Input type="password" name="password" id="userPassword" placeholder="enter account password" />
                                <FormFeedback>Password does not match email account</FormFeedback>
                            </FormGroup>
                            <Button>Login</Button>
                        </Form>
                        <p className="mt-3"><a href="#" onClick={this.props.newUser}>New to AirWays? Click Here to Create an Account...</a> </p>
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapStateToProps = state => ({
    userId: state.auth.userId,
    errors: state.auth.errors
  })

  const mapDispatchToProps = dispatch =>
    bindActionCreators({
      setAuthentication,
      login,
      createUser
    }, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))