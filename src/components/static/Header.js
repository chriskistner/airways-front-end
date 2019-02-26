import React from 'react';
import logo from '../../images/Airways.com_Logo_022419.jpg'
import LoginForm from '../homepage/LoginForm'
import {Row, Col} from 'reactstrap';

export default function SiteHeader({newUser, userName}) {

    return(
        <Row className="shrinkMargin headerCell noMargin">
            <Col>
                <Row className="noMargin pt-2 justify-content-between cellBorder bg-light">
                    <Col xs='4' className="mb-1">
                        <img className="logoBorder" src={logo} height="125" alt="airways.com logo" />
                    </Col>
                    <Col xs='4' className="mb-1">
                        {
                            userName ? <div>
                                <h2>Welcome {userName}</h2>
                                <span className='homeBarText'>How's The Air Today?</span>
                                </div> :
                            <LoginForm newUser={newUser}/>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};