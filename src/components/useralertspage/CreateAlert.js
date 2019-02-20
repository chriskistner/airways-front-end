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
                <Col>
                    <Label for="alertfor"> Select a {name}</Label>
                    <Input type="select" name="alertfor" id="alertfor" onChange={this.handleChange}>
                        <option value='base' selected disabled>Select a {name}</option>
                        {
                            arr.map(points => this.generateStoredLocations(points))
                        }
                    </Input>
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
    }

    render() {
        console.log(this.state.alertType)
        return (
            <Row>
                <Col style={{borderWidth: 1, borderStyle: 'solid', borderColor: 'gray'}}>
                    <Form>
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
                        <Button>Add Alert</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({createUserAlert}, dispatch)


export default withRouter(connect(null, mapDispatchToProps)(CreateAlert))