import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthentication, login, createUser } from '../../actions/authentication';
import { Container, Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

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
                    <Col>
                        <Form onSubmit={this.handleLogin}>
                            {
                            this.props.errors ? <Alert color="danger">Login in, check your user name and password.</Alert> : null
                            }
                            <Row>
                                <Col>
                                    <FormGroup className="mt-1">
                                        <Input type="email" name="email" id="userEmail" placeholder="user email" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={{marginTop: -10}}>
                                <Col xs='8'>
                                    <FormGroup>
                                        <Input type="password" name="password" id="userPassword" placeholder="user password" />
                                    </FormGroup>
                                </Col>
                                <Col xs='4'>
                                <Button>Login</Button>
                                </Col>
                            </Row>
                        </Form>
                        <p style={{marginBottom: 5}}><a href="#" onClick={this.props.newUser}>New to AirWays? Click to Join...</a> </p>
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