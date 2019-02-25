import React from 'react';

import { Row, Col} from 'reactstrap';

export default function aboutAirways() {

    return(
        <Row className="noMargin" style={{marginTop: -1}}>
            <Col xs='12' className="aboutHeight">
                <p className='pl-2 pr-2 mt-1'>
                    <b>You can start breathing easy.</b> Airways.com allows you to monitor the air quality and
                    Pollen information where you live. 
                    Create a profile, favorite locations, and routes based on your daily 
                    commute or other routine trips you take across town. You can also create alerts 
                    for these locations and routes to recieve a daily air report in your inbox.
                </p>
                <p className='pl-2 pr-2'>
                    Airways was created by Christiopher Kistner, a Galvanize Web Development student. Being a life-long asthmatic who was also prone 
                    to allergies every Spring, Chris saw a need for a better way to convey local air quality and 
                    pollen info to other asthmatics. Particularly those who enjoy an active lifestyle and like 
                    biking or walking to work. 
                </p>
            </Col>
        </Row>
    )
};