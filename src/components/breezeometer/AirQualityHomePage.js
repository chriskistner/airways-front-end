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
                            <Row className="mt-1">
                                <Col>
                                <p><b>Tree: </b>
                                {
                                    !this.props.pollen[0].types.tree.in_season ? "This allergen is out of season" :
                                    <span>Pollen is <u>{this.props.pollen[0].types.tree.index.category}</u>, Index of {this.props.pollen[0].types.tree.index.value} bpi</span>
                                }
                                </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Grass: </b>
                                    {
                                    !this.props.pollen[0].types.grass.in_season ? "This allergen is out of season" :
                                    <span>Pollen is <u>{this.props.pollen[0].types.grass.index.category}</u>, Index of {this.props.pollen[0].types.grass.index.value} bpi</span>
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
                                <b>Local Air Quality</b>
                                </Col>
                            </Row>
                            <Row style={{backgroundColor: this.props.conditions.indexes.usa_epa.color}}>
                                <Col>
                                    <p className="mt-1 mb-1">
                                        <i>{this.props.conditions.indexes.usa_epa.category} right now.</i>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <p className="pollutantsMargin"><b>Air Quality Index:</b> {this.props.conditions.indexes.usa_epa.aqi_display}</p>
                                    <p><b>Dominant Pollutant:</b> {this.props.conditions.indexes.usa_epa.dominant_pollutant}</p>
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