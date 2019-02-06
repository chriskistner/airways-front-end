import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './higherOrderComponents/authenticatedRoute';
import './App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {verifyUser} from './actions/authentication';
import HomePage from './components/homepage/LoginPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className='container'>
          <div className="row" >
            <div className="col border bg-light">
              <Switch>
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

export default connect(mapDispatchToProps)(App);
