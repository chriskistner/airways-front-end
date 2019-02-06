import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAuthentication, getUser} from '../../actions/authentication';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class UserNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    toggleNav = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Welcome User, Got To..</NavbarBrand>
              <NavbarToggler onClick={this.toggleNav} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/routes/">Routes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/locations">Locations</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/alerts">Alerts</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Logout</NavLink>
                    </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
                // <Navbar>
                //     <NavbarBrand href="/">Welcome User, Got To...</NavbarBrand>
                //     <NavbarToggler onClick={this.toggle} />
                //     <Collapse isOpen={this.state.isOpen} navbar></Collapse>
                //     <Nav className="ml-auto" navbar>
                //         <NavItem>
                //             <NavLink href="/routes/">Routes</NavLink>
                //         </NavItem>
                //         <NavItem>
                //             <NavLink href="/locations">Locations</NavLink>
                //         </NavItem>
                //         <NavItem>
                //             <NavLink href="/alerts">Alerts</NavLink>
                //         </NavItem>
                //         <NavItem>
                //             <NavLink href="/profile">Profile</NavLink>
                //         </NavItem>
                //         <NavItem>
                //             <NavLink href="#">Logout</NavLink>
                //         </NavItem>
                //     </Nav>
                // </Navbar>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({},dispatch)
}


export default connect(mapDispatchToProps)(UserNavBar)