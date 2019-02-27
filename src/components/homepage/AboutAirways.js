import React from 'react';

import { Row, Col} from 'reactstrap';

export default function aboutAirways() {

    return(
        <Row className="noMargin" style={{marginTop: -1}}>
            <Col xs='12' className="aboutHeight">
                <p className='pl-2 pr-2 mt-1'>
                    <b>You can start breathing easy.</b> Airways.com allows you to monitor the air quality and
                    pollen information where you live. Anyone with asthma or allergies has had that morning 
                    where you wake up and ask. Should I bike today or not? Do I need my allergy medication
                    even though it makes me drowsy? Airways takes away the guesswork via:
                </p>
                <ul>
                    <li>Saving important locations so you can lookup the air conditions</li>
                    <li>Creating routes and being able to see theirconditions at any point along it</li>
                    <li>Create alerts to get conditions for impoartant routes or locations send to your inbox</li>
                </ul>
                <p className='pl-2 pr-2'>
                    Airways was created by Christopher Kistner, a Galvanize Web Development student. Being a life-long asthmatic who was also prone 
                    to allergies every Spring, Chris saw a need for a better way to convey local air conditions to other asthmatics. Particularly those who enjoy an active lifestyle and like 
                    biking or walking to work. 
                </p>
            </Col>
        </Row>
    )
};