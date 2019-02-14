import React from 'react';

import { Row, Col, Button} from 'reactstrap';

export default function routerHomeBar({toggleForm}) {

    return(
        <Row style={{borderWidth: 1, borderStyle: 'solid', borderColor: 'gray'}}>
            <Col xs='10'>
                <h4>Welcome to Your Routes</h4>
            </Col>
            <Col xs='2'>
                <Button onClick={() => toggleForm()} size='sm'>Create Route</Button>
            </Col>
        </Row>
    )
}