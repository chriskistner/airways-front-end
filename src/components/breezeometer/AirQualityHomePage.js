import React, {Component} from 'react';
import {Container,Row, Col } from 'reactstrap';

export default class AirQualityHomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    generatePollutantList = (pollutants) => {
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
        let pollenData = null;
        let airData = null;
        if(this.props.currentPollen) {
            pollenData = this.props.currentPollen;
            airData = this.props.currentCond;
        } else { 
            pollenData = this.props.pollen;
            airData = this.props.conditions
        }
        return (
                airData.indexes && pollenData[0] ?
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
                                <p><b>Tree: </b>
                                {
                                    !pollenData[0].types.tree.in_season ? "This allergen is out of season" :
                                    <span>Pollen is <u>{pollenData[0].types.tree.index.category}</u> today, Index of {pollenData[0].types.tree.index.value} bpi</span>
                                }
                                </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Grass: </b>
                                    {
                                    !pollenData[0].types.grass.in_season ? "This allergen is out of season" :
                                    <span>Pollen is <u>{pollenData[0].types.grass.index.category}</u> today, Index of {pollenData[0].types.grass.index.value} bpi</span>
                                }
                                    
                                    </p>
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
                                    <p style={{color: airData.indexes.usa_epa.color}}>
                                        <b>{airData.indexes.usa_epa.category} right now.</b>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Air Quality Index:</b> {airData.indexes.usa_epa.aqi_display} | <b>Dominant Pollutant:</b> {airData.indexes.usa_epa.dominant_pollutant}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>All Pollutants Present:</b></p>
                                    {this.generatePollutantList(airData.pollutants)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container> : 
            
            <p>loading Air Quality Data...</p>
       

        )
    }
}