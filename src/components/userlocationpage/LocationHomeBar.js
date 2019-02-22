import React from 'react';

import { Row, Col, Button} from 'reactstrap';

export default function locationHomeBar({toggleForm}) {

    return(
        <Row className="noMargin homeBar">
            <Col xs='3'>
                <span className='homeBarText'>Your Locations:</span>
            </Col>
            <Col xs='4'>
                <span className='homeBarText'>Current Air Quality:</span>
            </Col>
            <Col xs='3'>
                <span className='homeBarText'>Current Location:</span>
            </Col>
            <Col xs='2'>
                <Button onClick={() => toggleForm()} size='sm'>Create Location</Button>
            </Col>
        </Row>
    )
};