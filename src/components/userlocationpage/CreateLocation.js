import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Form, Label, Input} from 'reactstrap';

class CreateLocation extends Component {
    constructor(props) {
        super(props) 
        this.state = {}
    }

    render() {
        return (
            <Row>
                <Col style={{borderWidth: 1, borderStyle: 'solid', borderColor: 'gray'}}>
                    <Form>
                        <Row>
                            <Col>
                                <Label for="newULocAddress">Enter Location</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='7'>
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

const mapStateToProps = state => ({

  })

  const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateLocation))
