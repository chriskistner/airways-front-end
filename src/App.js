import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container, Row, Col} from 'reactstrap';
import AuthenticatedRoute from './higherOrderComponents/authenticatedRoute';
import './App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {verifyUser} from './actions/authentication';
import SiteFooter from './components/static/Footer';
import HomePage from './components/homepage/LoginPage';
import UserHomePage from './components/userhomepage/UserHomePage';
import UserLocationsPage from './components/userlocationpage/LocationHomePage';
import UserRoutesPage from './components/userroutepage/RouteHomePage';
import UserProfilePage from './components/userprofile/UserProfilePage';
import UserAlertsPage from './components/useralertspage/UserAlertsPage';

class App extends Component {

  componentDidMount() {
    this.props.verifyUser()
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
          <BrowserRouter>
            <Switch>
              <AuthenticatedRoute path='/user/:userId/profile' component={UserProfilePage} />
              <AuthenticatedRoute path='/user/:userId/alerts' component={UserAlertsPage} />
              <AuthenticatedRoute path='/user/:userId/routes' component={UserRoutesPage} />
              <AuthenticatedRoute path='/user/:userId/locations' component={UserLocationsPage} />
              <AuthenticatedRoute path='/user/:userId' component={UserHomePage} />
              <Route path='/user' component={UserHomePage}/>
              <Route path='/' component={HomePage}/>
            </Switch>
          </BrowserRouter>
          <SiteFooter />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
bindActionCreators({
  verifyUser,
}, dispatch)

export default connect(null, mapDispatchToProps)(App);
