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

    generatePollutantList = (obj) => {
        
    }
    
    render() {
        console.log(this.props.conditions.pollutants && this.props.conditions.pollutants)
        return (
                this.props.conditions.indexes ?
                    <Container>
                    <Row>
                        <Col>
                            <h2>Current Home Air Quality</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                            <h4>Pollen Count</h4>
                            <hr />
                            <Row>
                                <Col>
                                <p><b>Current Count: 45</b></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Primary Allergen: Alder</b></p>
                                </Col>
                            </Row>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4>Pollutant Data</h4>
                            <hr />
                            <Row>
                                <Col>
                                    <p style={{color: this.props.conditions.indexes.usa_epa.color}}>
                                        <b>{this.props.conditions.indexes.usa_epa.category} today</b>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Air Quality Index: {this.props.conditions.indexes.usa_epa.aqi_display}</b></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Dominant Pollutant: {this.props.conditions.indexes.usa_epa.dominant_pollutant}</b></p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container> : 
            
            <p>loading...</p>
       

        )
    }
}

