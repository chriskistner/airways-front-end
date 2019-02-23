import React from 'react';

import { Row, Col, Button} from 'reactstrap';

export default function routerHomeBar({toggleForm}) {

    return(
        <Row className="noMargin homeBar">
            <Col xs='3'>
                <span className='homeBarText'>Your Routes:</span>
            </Col>
            <Col xs='4'>
                <span className='homeBarText'>Current Air Quality:</span>
            </Col>
            <Col xs='3'>
                <span className='homeBarText'>Current Route:</span>
            </Col>
            <Col xs='2'>
                <Button onClick={() => toggleForm()} size='sm'>Create Route</Button>
            </Col>
        </Row>
    )
}