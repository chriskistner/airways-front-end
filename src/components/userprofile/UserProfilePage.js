import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import { Container, Row, Col } from 'reactstrap';
import UserNavBar from '../userhomepage/UserNavBar';

class UserProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    };

    componentDidMount() {
        this.props.getUser(this.props.match.params.userId);
    };

    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName}/>
                    </Col>
                </Row>
                <Row>
                    <Col className='Cell'>
                        <Row className="noOverlap">
                            <Col xs='6' className="bg-light">
                                <b>User Name:</b> {this.props.userName}
                            </Col>
                        </Row>
                        <Row className="noOverlap ">
                            <Col xs='6' className="bg-light">
                                <b>Address:</b> {this.props.userAddress}
                            </Col>
                        </Row>
                        <Row className="noOverlap">
                            <Col xs='6' className="bg-light">
                                {this.props.userCity} {this.props.userState}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setAuthentication, getUser},dispatch)
};

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        userAddress: state.auth.address,
        userCity: state.auth.city,
        userState: state.auth.state,
        homeLat: state.auth.zipLat,
        homeLong: state.auth.zipLong,
        homeConditions: state.auth.homeConditions,
        homePollen: state.auth.homePollen
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
