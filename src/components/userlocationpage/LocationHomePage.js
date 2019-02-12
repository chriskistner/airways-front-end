import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {getUserLocations} from '../../actions/locations'
import UserNavBar from '../userhomepage/UserNavBar';
import GoogleMap from '../googlemaps/GoogleMap';

class UserLocationsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        this.props.getUserLocations(this.props.match.params.userId);
    }

    render () {
        console.log(this.props.locations)
        return (
            <Container>
                <Row>
                    <Col>
                        <UserNavBar user={this.props.userName}/>
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserLocations},dispatch)
}

const mapStateToProps = (state) => {
    return {
        userName: state.locations.userName,
        homeLat: state.locations.zipLat,
        homeLong: state.locations.zipLong,
        locations: state.locations.locations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationsPage)
