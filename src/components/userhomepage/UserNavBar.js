import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {setAuthentication, toggleError} from '../../actions/authentication';
import {
    Row,
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,} from 'reactstrap';

class UserNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
        }
    };

    toggleNav = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    logOut = () => {
        localStorage.removeItem('token');
        this.props.setAuthentication(null);
        this.props.toggleError(false);
        this.props.history.push(`/`)
    };

    goToHome = () => {
        this.props.history.push(`/user/${this.props.match.params.userId}`)
    };

    goToLocations = () => {
        this.props.history.push(`/user/${this.props.match.params.userId}/locations`)
    };

    goToRoutes = () => {
        this.props.history.push(`/user/${this.props.match.params.userId}/routes`)
    };

    goToProfile = () => {
        this.props.history.push(`/user/${this.props.match.params.userId}/profile`)
    };

    goToAlerts = () => {
        this.props.history.push(`/user/${this.props.match.params.userId}/alerts`)
    }

    render() {
        return (
            <Row>
                <Col>
                    <Navbar className="navBorder" color="light" light expand="md">
                    <NavbarBrand href="/">Go To Your..</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.goToHome} href="#">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.goToLocations} href="#">Locations</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.goToRoutes} href="#">Routes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.goToAlerts} href="#">Alerts</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.goToProfile} href="#">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.logOut} href="#">Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </Col>
            </Row>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setAuthentication, toggleError},dispatch)
}


export default withRouter(connect(null, mapDispatchToProps)(UserNavBar));