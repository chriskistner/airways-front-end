import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Form, Label, Input} from 'reactstrap';
import {createUserLocation} from '../../actions/locations';

class CreateLocation extends Component {
    constructor(props) {
        super(props) 
        this.state = {}
    };

    handleCreateLocation = (event) => {
        event.preventDefault();
        this.props.createUserLocation(this.props.match.params.userId,
            event.target.newLocName.value,
            event.target.newLocAddress.value,
            event.target.newLocCity.value,
            event.target.newLocState.value)

            event.target.newLocName.value= '';
            event.target.newLocAddress.value='';
            event.target.newLocCity.value='';
            event.target.newLocState.value='';
        this.props.toggleForm()
    };

    render() {
        return (
            <Row className="noMargin bg-light">
                <Col className="border createForm">
                    <Form onSubmit={this.handleCreateLocation}>
                        <Row>
                            <Col>
                                <Label>Enter Location</Label>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs='3'>
                                <Input type="text" name="newLocName" id="newLocName" placeholder="Enter Location Name"></Input>
                            </Col>
                            <Col xs='4'>
                                <Input type="text" name="newLocAddress" id="newLocAddress" placeholder="Enter Address"></Input>
                            </Col>
                            <Col xs='3'>
                                <Input type="text" name="newLocCity" id="newLocCity" placeholder="Enter City"></Input>
                            </Col>
                            <Col xs='2'>
                                <Input type="text" name="newLocState" id="newLocState" placeholder="Enter State"></Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Button>Save Location</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

        )
    }
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({createUserLocation}, dispatch)


export default withRouter(connect(null, mapDispatchToProps)(CreateLocation))
