import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthentication, login, createUser } from '../../actions/authentication';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import LoginForm from './LoginForm';
import CreateUserForm from './CreateUserForm';

class HomePage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            newUser: false,
        }
    }

    toggleNewUserField = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    };


    render() {
        return (
            <Container>
                <LoginForm newUser={this.toggleNewUserField}/>
                {
                    this.state.newUser ? <CreateUserForm/>: null
                }       
            </Container>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))