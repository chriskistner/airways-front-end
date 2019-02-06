import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './higherOrderComponents/authenticatedRoute';
import './App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {verifyUser} from './actions/authentication';
import HomePage from './components/homepage/LoginPage';
import UserHomePage from './components/userhomepage/UserHomePage'

class App extends Component {

  componentDidMount() {
    this.props.verifyUser()
  }

  render() {
    return (
      <BrowserRouter>
      <div className='container'>
          <div className="row" >
            <div className="col border bg-light">
              <Switch>
                <AuthenticatedRoute path='/user/:userId' component={UserHomePage} />
                <Route path='/user' component={UserHomePage}/>
                <Route path='/' component={HomePage}/>
              </Switch>
              </div>
          </div>
      </div>
    </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch =>
bindActionCreators({
  verifyUser,
}, dispatch)

export default connect(null, mapDispatchToProps)(App);
