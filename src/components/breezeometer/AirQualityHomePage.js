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

    generatePollutantList = () => {
        const pollutants = this.props.conditions.pollutants;
        const pollArr = [];
        Object.keys(pollutants).forEach(key => {
            pollArr.push(pollutants[key])
        })
        return (
            <ul>
                {pollArr.map(particle => <li><b>{particle.full_name}</b>, {particle.concentration.value}{particle.concentration.units}</li>)}
            </ul>
        )
    }
    
    render() {
        return (
                this.props.conditions.indexes ?
                    <Container style={{borderWidth: 2, borderStyle: 'solid', borderColor: 'black'}}>
                    <Row>
                        <Col>
                            <h2>Current Air Quality</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row style={{backgroundColor: "#A9B6BB"}}>
                                <Col>
                                <h4>Pollen Count</h4>
                                </Col>
                            </Row>
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
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row style={{backgroundColor: "#A9B6BB"}}>
                                <Col>
                                <h4>Pollutant Data</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p style={{color: this.props.conditions.indexes.usa_epa.color}}>
                                        <b>{this.props.conditions.indexes.usa_epa.category} right now.</b>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Air Quality Index:</b> {this.props.conditions.indexes.usa_epa.aqi_display} | <b>Dominant Pollutant:</b> {this.props.conditions.indexes.usa_epa.dominant_pollutant}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>All Pollutants Present:</b></p>
                                    {this.generatePollutantList()}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container> : 
            
            <p>loading...</p>
       

        )
    }
}

