import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthentication, login, createUser } from '../../actions/authentication';
import { Container} from 'reactstrap';
import LoginForm from './LoginForm';
import CreateUserForm from './CreateUserForm';

class HomePage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
        }
    }

    toggleModal = () => {
        console.log(this.state.modal)
        this.setState({
            modal: !this.state.modal
        })
    };

    render() {
        return (
            <Container>
                <LoginForm newUser={this.toggleModal}/>
                <CreateUserForm newUser={this.toggleModal} modalStatus={this.state.modal}/>
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