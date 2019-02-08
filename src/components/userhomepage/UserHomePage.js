import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import {getGeoCode} from '../../actions/google'
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
        // this.props.getGeoCode(this.props.userZip)
    }

    render() {
        console.log(this.props.userZip)
        console.log('coordinates:', this.props.homeLat, this.props.homeLong)
        return (
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="8" style={{height: 400}}>
                        <GoogleMap homeLat={this.props.homeLat} homeLong={this.props.homeLong} google={this.props.google}/>
                    </Col>  
                </Row>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setAuthentication, getUser, getGeoCode},dispatch)
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        userZip: state.auth.userZip,
        homeLat: state.auth.zipLat,
        homeLong: state.auth.zipLong
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
