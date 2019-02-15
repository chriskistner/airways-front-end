import React, { Component } from 'react';
import {GoogleApiWrapper, Map, InfoWindow, Marker, Polyline} from 'google-maps-react';
import {Container,Row} from 'reactstrap';
// import google, from 'google-maps-react';
// import {bindActionCreators} from 'redux';
// import {withRouter} from 'react-router'
// import {connect} from 'react-redux';

class GoogleMap extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    };

    generateLocation = (lat, long) => {

    };

    generatePolyline =(arr) => {
        return (
            <Polyline 
                path={arr}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
                />
        )
    };

    generateMarker = (obj,name) => {
        return (
            <Marker
            title={'Your Default Zip Code Based on Your Profile'}
            name={this.props.currentName || 'Home'}
            position={{lat: this.props.currentLat ? this.props.currentLat : this.props.homeLat,
             lng: this.props.currentLong ? this.props.currentLong : this.props.homeLong}}/>
        )
    };

    render() {
        
        return (
             this.props.coordinates ? 
                <Container>
                    <Row>
                        <Map
                        style={{width: '100%', height: '100%', position: 'relative'}} 
                        google={this.props.google} 
                        zoom={15}
                        scrollwheel={true}
                        initialCenter={this.props.coordinates}
                        center={this.props.coordinates}
                        >
                            <Marker
                                title={'Your Default Zip Code Based on Your Profile'}
                                name={this.props.currentName || 'Home'}
                                position={this.props.coordinates}/>
                        </Map>
                    </Row>
                </Container>
 : <p>loading...</p>

        )
    }
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCEmeR8XRZW98UfLU6Uu8SOlB6xYeIirFY'
})(GoogleMap);