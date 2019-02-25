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
        return (
            this.props.conditions.indexes && this.props.pollen[0] ?
                <Container className='subCell'>
                    <Row>
                        <Col>
                            <Row className='airCat'>
                                <Col>
                                <b>Pollen Count</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <p><b>Tree: </b>
                                {
                                    !this.props.pollen[0].types.tree.in_season ? "This allergen is out of season" :
                                    <span>Pollen is <u>{this.props.pollen[0].types.tree.index.category}</u> today, Index of {this.props.pollen[0].types.tree.index.value} bpi</span>
                                }
                                </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Grass: </b>
                                    {
                                    !this.props.pollen[0].types.grass.in_season ? "This allergen is out of season" :
                                    <span>Pollen is <u>{this.props.pollen[0].types.grass.index.category}</u> today, Index of {this.props.pollen[0].types.grass.index.value} bpi</span>
                                }
                                    
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className='airCat'>
                                <Col>
                                <b>Pollutant Data</b>
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
                                    <p className="pollutantsMargin"><b>All Pollutants Present:</b></p>
                                    {this.generatePollutantList(this.props.conditions.pollutants)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container> : 
            
            <p>loading Air Quality Data...</p>
       

        )
    }
}