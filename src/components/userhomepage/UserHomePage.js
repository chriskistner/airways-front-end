import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import { Container, Row, Col } from 'reactstrap';
import UserNavBar from './UserNavBar'

class UserHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <Container>
                <UserNavBar/>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({},dispatch)
}

export default connect(mapDispatchToProps)(UserHomePage)
