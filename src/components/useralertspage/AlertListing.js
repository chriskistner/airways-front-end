import React from 'react';
import {Row, Col, Button} from 'reactstrap';

export default function AlertListing ({userId, id, name, type, alert_frequency, created_at, dropAlert}) {
    return (
        <Row className="userList noMargin bg-light">
            <Col className="noPadding cellBorder">
            <Row className="noMargin mt-1 mb-1 align-items-center">
                <Col xs='3' >
                    <b>NAME:</b>
                </Col>
                <Col xs='2' >
                    <b>TYPE:</b>
                </Col>
                <Col xs='2' >
                    <b>SENT:</b>
                </Col>
                <Col xs='3' >
                    <b>CREATED:</b>
                </Col>  
                <Col xs='2'>
                    <Button  outline color="danger" size="sm" onClick={() => dropAlert(userId, id)} >Delete Alert</Button>
                </Col>
            </Row>
            <Row className="noMargin align-items-center">
                <Col xs='3' >
                    {name}
                </Col>
                <Col xs='2' >
                    {type}
                </Col>
                <Col xs='2' >
                    {alert_frequency}
                </Col>
                <Col xs='3'>
                    {created_at.substring(0, 10)}
                </Col> 
            </Row>
            </Col>
        </Row>
    )
};