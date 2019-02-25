import React from 'react';
import {Row, Col} from 'reactstrap';

export default function SiteHeader() {

    return(
        <Row className="shrinkMargin headerCell">
            <Col>
                <Row className="noMargin pt-2 pb-2 cellBorder bg-light">
                    <Col>
                        <img src="../images/Airways.com_logo_022419.jpg" alt="Airways Logo" />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};