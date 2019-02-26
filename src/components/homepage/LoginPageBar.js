import React from 'react';

import { Row, Col} from 'reactstrap';

export default function locationHomeBar({message}) {

    return(
        <Row className="noMargin homeBar">
            <Col xs='6'>
                <span className='homeBarText'>About Airways</span>
            </Col>
            <Col xs='6'>
                <span className='homeBarText'>The Air {message} Today is..</span>
            </Col>
        </Row>
    )
};