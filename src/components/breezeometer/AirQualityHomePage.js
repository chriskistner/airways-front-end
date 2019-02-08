import React, {Component} from 'react';
import {Container,Row, Col } from 'reactstrap';


export default class AirQualityHomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pollen: {},
            pollutants: {}
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Current Home Air Quality</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                        <h3>Pollen Count</h3>
                        <hr />
                        <Row>
                            <p><b>Current Count: 45</b></p>
                        </Row>
                        <Row>
                            <p><b>Primary Allergen: Alder</b></p>
                        </Row>
                        <Row>
                            <p><b>Secondary Allergen: Alder</b></p>
                        </Row>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Pollutant Data</h3>
                        <hr />
                        <Row>
                            <p><b>Primary Pollutant: SO2</b></p>
                        </Row>
                        <Row>
                            <p><b>PPM-25: 125</b></p>
                        </Row>
                        <Row>
                            <p><b>PPM-50: 45</b></p>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

