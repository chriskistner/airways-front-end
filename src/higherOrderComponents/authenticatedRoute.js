import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AuthenticatedRoute = props => {
    const {
      auth: {
        pending = false,
        userId
      },
      path,
      component
    } = props
  if(pending && !userId){
    return <div>Loading...</div>
  }
  else if(userId) {
    return <Route path={path} component={component} />
  }
  else {
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AuthenticatedRoute)