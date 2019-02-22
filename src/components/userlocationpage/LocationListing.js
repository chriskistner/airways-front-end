import React from 'react';
import {Row, Col, Button, ButtonGroup } from 'reactstrap';

export default function locationListing ({id, name, longitude, latitude, userId,  match, setCurrent, deleteLoc}) {
    return (
        <Row className="userList noMargin">
            <Col xs="4" className="userListRow noPadding userListCol" >
                {name}
            </Col>
            <Col xs="8" className="userListRow noPadding">
                <ButtonGroup className='userListCol'>
                    <Button outline color="success" size="sm" onClick={() => setCurrent(name, latitude, longitude)}>Air Data</Button>
                    <Button outline color="danger" size="sm" onClick={() => deleteLoc(userId, id)} >Delete</Button>
                </ButtonGroup>
            </Col> 
        </Row>
    )
};
