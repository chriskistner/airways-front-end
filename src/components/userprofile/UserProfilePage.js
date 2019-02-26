import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import { Container, Row, Col } from 'reactstrap';
import SiteHeader from '../static/Header';
import UserNavBar from '../userhomepage/UserNavBar';
import UserProfileHomeBar from './UserProfileHomeBar';
import UpdateProfileForm from './UpdateProfileForm';

class UserProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updateProfile: false
        }
    };

    componentDidMount() {
        this.props.getUser(this.props.match.params.userId);
    };

    toggleCreateForm = () => {
        this.setState({
            updateProfile: !this.state.updateProfile
        })
    };

    render() {
        return(
            <Container>
                <SiteHeader userName={this.props.userName} newUser={this.toggleModal} />
                <Row>
                    <Col className="Cell">
                        <UserNavBar user={this.props.userName}/>
                        <Row className="noMargin">
                            <Col className="noPadding cellBorder" >
                                <UserProfileHomeBar userName={this.props.userName}
                                                    address={this.props.userAddress}
                                                    city={this.props.userCity}
                                                    state={this.props.userState}
                                                    email={this.props.userEmail}
                                                    toggleForm={this.toggleCreateForm}
                                                    />
                            </Col>
                        </Row>
                        {this.state.updateProfile ? <UpdateProfileForm toggleForm ={this.toggleCreateForm}/> : null}
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
        userEmail: state.auth.email
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
