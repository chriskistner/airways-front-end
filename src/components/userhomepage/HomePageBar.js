import React from 'react';
import { Row, Col} from 'reactstrap';

export default function locationHomeBar() {

    return(
        <Row className="noMargin homeBar">
            <Col xs='12'>
                <span className='homeBarText'>Here's Today's Air Quality for Your Home Address</span>
            </Col>

        </Row>
    )
};