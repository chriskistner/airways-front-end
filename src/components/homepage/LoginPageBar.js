import React from 'react';

import { Row, Col, Button} from 'reactstrap';

export default function locationHomeBar({toggleForm}) {

    return(
        <Row className="noMargin homeBar">
            <Col xs='4'>
                <span className='homeBarText'>About Airways</span>
            </Col>
            <Col xs='4'>
                <span className='homeBarText'>The Air in Seattle Today is..</span>
            </Col>
            <Col xs='4'>
                <span className='homeBarText'>Login To Your Profile</span>
            </Col>
        </Row>
    )
};