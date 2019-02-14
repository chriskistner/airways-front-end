import React from 'react';
import {Row, Col, Button, ButtonGroup } from 'reactstrap';

export default function routeListing ({id, name, polyline, userId, }) {
    return (
        <Row>
            <Col xs="4">
                {name}
            </Col>
            <Col xs="8">
                <ButtonGroup>
                    <Button outline color="success" size="sm">Air Data</Button>
                    <Button outline color="danger" size="sm" >Delete Loc</Button>
                </ButtonGroup>
            </Col> 
        </Row>
    )
};