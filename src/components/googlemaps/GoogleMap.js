import React, { Component } from 'react';
import {ReactDOM} from 'react-dom';
import {GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react';
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
        const style = {
            width: '100%',
            height: '100%'
          }
        return (
            <Map style= {style} google={this.props.google} zoom={14}>
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
        
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                    <h1>Test Map</h1>
                    </div>
                </InfoWindow>
          </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCEmeR8XRZW98UfLU6Uu8SOlB6xYeIirFY'
})(GoogleMap)