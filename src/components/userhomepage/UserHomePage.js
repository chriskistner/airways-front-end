import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import { Container, Row, Col } from 'reactstrap';
import UserNavBar from './UserNavBar';
import GoogleMap from '../googlemaps/GoogleMap';
class UserHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.userId);
    }
    render() {
        return (
            <Container>
                <UserNavBar user={this.props.userName}/>
                <GoogleMap google={this.props.google}/>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setAuthentication, getUser},dispatch)
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        userZip: state.auth.userZip
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
