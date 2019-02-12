import React, { Component } from 'react';
import {GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react';
import {Container,Row, Col } from 'reactstrap';
// import google, from 'google-maps-react';
// import {bindActionCreators} from 'redux';
// import {withRouter} from 'react-router'
// import {connect} from 'react-redux';

class GoogleMap extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        console.log(this.props.currentLat)
        return (
             this.props.homeLat ? 
                <Container>
                    <Row>
                        <Map
                        style={{width: '100%', height: '100%', position: 'relative'}} 
                        google={this.props.google} 
                        zoom={15}
                        scrollwheel={true}
                        initialCenter={{
                            lat: this.props.currentLat ? this.props.currentLat : this.props.homeLat,
                            lng: this.props.currentLong ? this.props.currentLong : this.props.homeLong
                        }}
                        center={{
                            lat: this.props.currentLat ? this.props.currentLat : this.props.homeLat,
                            lng: this.props.currentLong ? this.props.currentLong : this.props.homeLong
                        }}
                        >
                            <Marker
                                title={'Your Default Zip Code Based on Your Profile'}
                                name={'Home'}
                                position={{lat: this.props.homeLat, lng: this.props.homeLong}}/>
                        
                            <InfoWindow onClose={this.onInfoWindowClose}>
                                <div>
                                <h1>Test Map</h1>
                                </div>
                            </InfoWindow>
                        </Map>
                    </Row>

                </Container>
 : <p>loading...</p>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCEmeR8XRZW98UfLU6Uu8SOlB6xYeIirFY'
})(GoogleMap)