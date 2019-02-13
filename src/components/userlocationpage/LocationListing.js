import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Row, Col, Button, ButtonGroup } from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

function locationListing ({id, name, longitude, latitude, userId,  match, setCurrent, deleteLoc}) {
    return (
        <Row>
            <Col xs="4">
                {name}
            </Col>
            <Col xs="8">
                <ButtonGroup>
                    <Button outline color="success" size="sm" onClick={() => setCurrent(name, latitude, longitude)}>Air Data</Button>
                    <Button outline color="danger" size="sm" onClick={() => deleteLoc(userId, id)} >Delete Loc</Button>
                </ButtonGroup>
            </Col> 
        </Row>
    )
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({},dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(locationListing))