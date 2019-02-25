import React from 'react';

import { Row, Col, Button} from 'reactstrap';

export default function profileHomeBar({userName, address, city, state, email, toggleForm}) {

    return(
        <Row className="noMargin homeBar">
            <Col xs='2'>
                <b>User Name:</b> {userName}
            </Col>
            <Col xs='4'>
                <b>Address:</b> {address} {city}, {state}
            </Col>
            <Col xs='4'>
                <b>Email:</b> {email}
            </Col>
            <Col xs='2'>
                <Button onClick={() => toggleForm()} size='sm'>Update Address</Button>
            </Col>
        </Row>
    )
};