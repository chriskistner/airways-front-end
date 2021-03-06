import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthentication, login, createUser } from '../../actions/authentication';
import { Container, Row, Col} from 'reactstrap';
import SiteHeader from '../static/Header';
import LoginPageBar from './LoginPageBar';
import AboutAirways from './AboutAirways';
import AirQualityHomePage from '../breezeometer/AirQualityHomePage';
import CreateUserForm from './CreateUserForm';

const breezeApi = process.env.REACT_APP_BREEZE_O_METER_API_KEY;
const conditionsUrl = process.env.REACT_APP_BREEZE_O_METER_CURRENT_CONDITIONS_URL;
const pollenUrl = process.env.REACT_APP_BREEZE_O_METER_POLLEN_URL;

class HomePage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            currentLocName: '',
            currentCond: null,
            currentPollen: null
        }
    };

    componentDidMount() {
        this.handleLocationSelecton();
    };

    toggleModal = () => {
        console.log(this.state.modal)
        this.setState({
            modal: !this.state.modal
        })
    };

    fetchLocation = async () => {
        if ("geolocation" in navigator) {
            return new Promise((resolve, reject)=> {
                navigator.geolocation.getCurrentPosition(function(position) {
                    resolve([position.coords.latitude, position.coords.longitude, "Where You Are"])
        
                    });
            })
            } else {
            return Promise.resolve([47.606209, -122.332069, "In Seattle"])
        };
    }

    setLocalConditions = (long, lat) => {
        return axios.get(`${conditionsUrl}lat=${lat}&lon=${long}&key=${breezeApi}&features=breezometer_aqi,local_aqi,pollutants_concentrations,pollutants_aqi_information`,{})
 
    };

    setLocalPollen = (long, lat) => {
        return axios.get(`${pollenUrl}lat=${lat}&lon=${long}&days=1&key=${breezeApi}`,{})
    };

    handleLocationSelecton = async () => {
        try{
            const coordinates = await this.fetchLocation()
            const conditions = await this.setLocalConditions(coordinates[1], coordinates[0])
            const pollen = await this.setLocalPollen(coordinates[1], coordinates[0])
            this.setState({
                currentLocName: coordinates[2],
                currentCond: conditions.data.data,
                currentPollen: pollen.data.data
            })
        }catch(err) {
            console.log(err)
        }
    };


    render() {
        const pollenData = this.state.currentPollen;
        const airData = this.state.currentCond;
        return (
                <div className="HomePage">
                <Container>
                        <SiteHeader newUser={this.toggleModal} />
                        <Row>
                            <Col className='Cell'>
                                <LoginPageBar message={this.state.currentLocName}/>
                                <Row className="noMargin bg-light row align-items-start">
                                    <Col className="noPadding cellBorder cellHeight bg-light" sm="6">
                                        <AboutAirways />
                                        <CreateUserForm newUser={this.toggleModal} modalStatus={this.state.modal}/>
                                    </Col>
                                    <Col className="noPadding cellHeight cellBorder" sm='6'>
                                        {pollenData ? <AirQualityHomePage pollen={pollenData} 
                                                        conditions={airData}/> : <p>Loading...</p>}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                </Container>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    userId: state.auth.userId
  })

  const mapDispatchToProps = dispatch =>
    bindActionCreators({
      setAuthentication,
      login,
      createUser
    }, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))