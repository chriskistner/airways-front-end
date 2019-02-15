import React, { Component } from 'react';
import {GoogleApiWrapper, Map, Marker, Polyline} from 'google-maps-react';
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
            onClick={() => this.props.setCurrentPoint(obj)}
            title={`Location #${name+1} of your route`}
            name={name}
            position={obj}/>
        )
    };

    render() {

        let bounds = null
        if(Array.isArray(this.props.coordinates)) {
            bounds = new this.props.google.maps.LatLngBounds();
            for (var i = 0; i < this.props.coordinates.length; i++) {
                bounds.extend(this.props.coordinates[i]);
            }
        }
        return (

             Array.isArray(this.props.coordinates) ? 
                <Container>
                    <Row>
                        <Map
                        style={{width: '100%', height: '100%', position: 'relative'}} 
                        google={this.props.google} 
                        zoom={10}
                        scrollwheel={true}
                        initialCenter={this.props.coordinates[0]}
                        bounds={bounds}
                        >
                            <Polyline 
                                path={this.props.coordinates}
                                strokeColor="#0000FF"
                                strokeOpacity={0.8}
                                strokeWeight={2}
                            />
                            {
                                this.props.coordinates.map(point => this.generateMarker(point, this.props.coordinates.indexOf(point)))
                            }
                        </Map>
                    </Row>
                </Container>
                :    
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

        )
    }
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCEmeR8XRZW98UfLU6Uu8SOlB6xYeIirFY'
})(GoogleMap);