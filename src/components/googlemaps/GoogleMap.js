import React, { Component } from 'react';
import {GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react';
import { Container, Row, Col } from 'reactstrap';
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

        return (
            <Container style={{height: 500}}>
                <Map google={this.props.google} zoom={14}>
                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />
            
                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                        <h1>Test Map</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </Container>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCEmeR8XRZW98UfLU6Uu8SOlB6xYeIirFY'
})(GoogleMap)