import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Row, Col, Button } from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

function locationListing ({id, name, longitude, latitude, userId,  match, setCurrent}) {
    return (
        <Row>
            <Col xs="5">
                <b>{name}</b> 
            </Col>
            <Col xs="5">
                <Button outline color="success" size="sm" block onClick={() => setCurrent(name, latitude, longitude)}>Get Air Info</Button>
            </Col>
            <Col xs="1">
                DEL
            </Col>
        </Row>
    )
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({},dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(locationListing))