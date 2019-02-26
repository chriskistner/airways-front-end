import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Form, Label, Input} from 'reactstrap';
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
            name === 'home' ? 
                <Row className="noMargin align-items-end mb-3">
                <Col xs="3">
                    <Label for="alertSched"> Recieve Alert Every</Label>
                    <Input type="select" name="alertSched" id="alertSched" onChange={this.handleChange}>
                        <option value='base' selected disabled>Send My Alert...</option>
                        <option value='daily'>Daily</option>
                        <option value='weekly'>Weekly</option>
                    </Input>
                </Col>
                <Col xs="3">
                    <Button outline color="success">Add Alert</Button>
                </Col>
            </Row>
            :
            <Row className="noMargin align-items-end mb-3">
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
                    <Button outline color="success">Add Alert</Button>
                </Col>
            </Row>
        )
    };

    renderAlertTypes = () => {
        if (this.state.alertType === 'location') {
            return this.generateList('Location', this.props.locations)
        } else if (this.state.alertType === 'route') {
            return this.generateList('Route', this.props.routes)
        } else if (this.state.alertType === 'home') {
            return this.generateList('home', this.props.userHome)
        }
        else { return null}
    };

    handleCreateAlert = (event) => {
        event.preventDefault();
        if (this.state.alertType === 'home') {
            this.props.createUserAlert(this.props.match.params.userId,
                "Home Address",
                "location",
                this.state.alertSched,
                'fake str',
                parseFloat(this.props.userHome[0]),
                parseFloat(this.props.userHome[1])
                )
            this.props.toggleForm()
        }
        else if (this.state.alertType === 'location') {
            const alertValue = this.props.locations.filter(point => point.id === parseInt(this.state.alertFor));
            this.props.createUserAlert(this.props.match.params.userId,
                alertValue[0].name,
                this.state.alertType,
                this.state.alertSched,
                'fake str',
                parseFloat(alertValue[0].latitude),
                parseFloat(alertValue[0].longitude)
                )
            this.props.toggleForm()

        } else { 
            const alertValue = this.props.routes.filter(point => point.id === parseInt(this.state.alertFor));
            this.props.createUserAlert(this.props.match.params.userId,
                alertValue[0].name,
                this.state.alertType,
                this.state.alertSched,
                alertValue[0].polyline,
                1,
                1
                )
            this.props.toggleForm()
        }
    };

    render() {
        return (
            <Row className="noMargin mb-3 bg-light">
                <Col className="noPadding cellBorder">
                    <Form onSubmit={this.handleCreateAlert}>
                        <Row className="noMargin mt-2 mb-3">
                            <Col xs='6'>
                                <Input type="select" name="alertType" id="alertType" onChange={this.handleChange}>
                                    <option value='base' selected disabled>Alert is for a...</option>
                                    <option value='home'>Home Address</option>
                                    <option value='location'>Location</option>
                                    <option value='route'>Route</option>
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