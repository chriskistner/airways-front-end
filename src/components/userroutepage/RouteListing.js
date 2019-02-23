import React from 'react';
import {Row, Col, Button, ButtonGroup } from 'reactstrap';

export default function routeListing ({id, name, polyline, userId, selectRoute, dropRoute }) {
    return (
        <Row className="userList noMargin justify-content-between align-items-center">
            <Col xs="4" className="userListRow noPadding userListCol">
                {name}
            </Col>
            <Col xs="8" className="userListRow noPadding">
                <ButtonGroup className='userListCol'>
                    <Button outline color="success" size="sm" onClick={() => selectRoute(name, polyline)}>Air Data</Button>
                    <Button outline color="danger" size="sm" onClick={() => dropRoute(userId, id)} >Delete Loc</Button>
                </ButtonGroup>
            </Col> 
        </Row>
    )
};