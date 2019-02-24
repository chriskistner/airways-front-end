import React from 'react';

import { Row, Col, Button} from 'reactstrap';

export default function alertHomeBar({toggleForm}) {

    return(
        <Row className="noMargin homeBar">
            <Col xs='10'>
                <span className='homeBarText'>Welcome to Your Alerts</span>
            </Col>
            <Col xs='2'>
                <Button onClick={() => toggleForm()} size='sm'>Create Alert</Button>
            </Col>
        </Row>
    )
}