import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthentication, login, createUser } from '../../actions/authentication';
import { Container, Row, Col} from 'reactstrap';
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

        let coordinates = null;
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                coordinates = [position.coords.latitude, position.coords.longitude];
                console.log(coordinates)
                console.log("geolocation")
               });
          } else {
            coordinates = [47.606209, -122.332069]
            console.log('default')
          };

        return (
            <div className="HomePage">
                <Container>
                        <Row>
                            <Col className="Cell" sm="12" md={{ size: 6, offset: 3 }}>
                                <LoginForm newUser={this.toggleModal}/>
                                <CreateUserForm newUser={this.toggleModal} modalStatus={this.state.modal}/>
                            </Col>
                        </Row>
                </Container>
            </div>
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