import React, { Component } from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Form, Label, Input, FormGroup, ButtonGroup} from 'reactstrap';
import {createUserAlert} from '../../actions/alerts';

class CreateAlert extends Component {
    constructor(props) {
        super(props)

        this.state={
        }
    };

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
    };

    generateStoredLocations = (obj) => {
        return (
        <option id={obj.id} value={obj.id}>{obj.name}</option>
        )
    };

    generateList = (name, arr) => {
        return (
            <Row>
                <Col xs="6">
                    <Label for="alertFor"> Select a {name}</Label>
                    <Input type="select" name="alertFor" id="alertFor" onChange={this.handleChange}>
                        <option value='base' selected disabled>Select a {name}</option>
                        {
                            arr.map(points => this.generateStoredLocations(points))
                        }
                    </Input>
                </Col>
                <Col xs="3">
                    <Label for="alertSched"> Recieve Alert Every</Label>
                    <Input type="select" name="alertSched" id="alertSched" onChange={this.handleChange}>
                        <option value='base' selected disabled>Send My Alert...</option>
                        <option value='daily'>Daily</option>
                        <option value='weekly'>Weekly</option>
                    </Input>
                </Col>
                <Col xs="3">
                    <Button>Add Alert</Button>
                </Col>
            </Row>
        )
    };

    renderAlertTypes = () => {
        if (this.state.alertType === 'location') {
            return this.generateList('Location', this.props.locations)
        } else if (this.state.alertType === 'routes') {
            return this.generateList('Route', this.props.routes)
        } else { return null}
    };

    handleCreateAlert = (event) => {
        event.preventDefault();
        if (this.state.alertType === 'location') {
            const alertValue = this.props.locations.filter(point => point.id === parseInt(this.state.alertFor));
            this.props.createUserAlert(this.props.match.params.userId,
                alertValue[0].name,
                this.state.alertType,
                this.state.alertSched,
                'fake',
                parseFloat(alertValue[0].latitude),
                parseFloat(alertValue[0].longitude)
                )
        } else { 
            const alertValue = this.props.routes.filter(point => point.id === parseInt(this.state.alertFor));
            console.log(alertValue);
        }
    }

    render() {
        console.log(this.state.alertFor)
        return (
            <Row>
                <Col style={{borderWidth: 1, borderStyle: 'solid', borderColor: 'gray'}}>
                    <Form onSubmit={this.handleCreateAlert}>
                        <Row>
                            <Col>
                                <Label for="alertType">Begin Building Your Route by Selecting a Type</Label>
                                <Input type="select" name="alertType" id="alertType" onChange={this.handleChange}>
                                    <option value='base' selected disabled>Alert is for a...</option>
                                    <option value='location'>Location</option>
                                    <option value='routes'>Route</option>
                                </Input>
                            </Col>
                        </Row>
                        {this.renderAlertTypes()}
                    </Form>
                </Col>
            </Row>
        )
    }
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({createUserAlert}, dispatch)


export default withRouter(connect(null, mapDispatchToProps)(CreateAlert))