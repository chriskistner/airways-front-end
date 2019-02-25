import React from 'react';
import logo from '../../images/Airways.com_Logo_022419.jpg'
import {Row, Col} from 'reactstrap';

export default function SiteHeader() {

    return(
        <Row className="shrinkMargin headerCell">
            <Col>
                <Row className="noMargin pt-2 pb-2 cellBorder bg-light">
                    <Col>
                        <img className="logoBorder" src={logo} height="100" alt="airways.com logo" />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};