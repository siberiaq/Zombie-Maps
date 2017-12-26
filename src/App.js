import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import style from './bootstrap/css/bootstrap.css';
import {Tabs, Tab, InputGroup, Navbar, Alert, NavItem, Nav, Grid, Row, Col, Button, Form, FormGroup, FormLabel, ControlLabel, FormControl, Checkbox} from "react-bootstrap";
import axios from 'axios';
import { YMaps, Map, Clusterer, Placemark, Circle } from 'react-yandex-maps';

import points from './points.json';

const mapState = {
  center: [55.751574, 37.573856],
  zoom: 9,
  behaviors: ['default', 'scrollZoom'],
};

const getPointData = index => {
  return {
    balloonContentBody: 'placemark <strong>balloon ' + index + '</strong>',
    clusterCaption: 'placemark <strong>' + index + '</strong>',
  };
};

const getPointOptions = () => {
  return {
    preset: 'islands#violetIcon',
  };
};

const markerStyles = {
    width: '50px',
    height: '50px',
    overflow: 'visible'
};

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      autherror: null,
      authsuccess: null,
      username: null,
      sossuccess: null
    };

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    axios.get('https://api.siberiaq.com/zmaps/Auth/', {
      params: {
        login: this.state.login,
        password: this.state.password
      }
    })
      .then(function (response) {
        if (response.data.status == 'complete') {
          self.setState({authsuccess: true});
          self.setState({username: response.data.name});
          var map = document.getElementById('mapp');
          map.style.display = 'block';
          var tabs = document.getElementsByClassName('nav nav-tabs')[0];
          tabs.style.display = 'none';
        } else if(response.data.status == 'error') {
          self.setState({autherror: response.data.message});
        } else {
          console.log('?');
        }
    })
  }
  handleChangeLogin(event) {
    this.setState({login: event.target.value});
    this.setState({autherror: null});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
    this.setState({autherror: null});
  }
  getSOS(event) {
    var sossuccess = document.getElementById('sossuccess');
    sossuccess.style.display = 'block';
  }
  render() {
    return (
      <div>
        <Form style={this.state.authsuccess ? {display: 'none'} : {}} onSubmit={this.handleSubmit} horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={10}>
              <InputGroup>
                <FormControl name="login" type="text" value={this.state.login} onChange={this.handleChangeLogin} placeholder="Email" />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={10}>
              <InputGroup>
                <FormControl name="password" type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={10}>
              <Button bsSize="large" type="submit" block>
                Sign In
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <div style={{width: 295}}>
          <Alert style={this.state.autherror ? {} : { display: 'none' }} bsStyle="danger">
            <strong>{this.state.autherror}</strong>
          </Alert>
        </div>
        <div style={{width: 295}} style={this.state.authsuccess ? {} : { display: 'none' }}>
          <Alert bsStyle="success">
            <strong>{this.state.username}, welcome to Zombie Maps!</strong>
          </Alert>
          <Button bsSize="large" onClick={this.getSOS} style={{backgroundColor: 'red', color: 'white'}} block>
            SOS
          </Button>
          <div id="sossuccess" style={{ display: 'none' }}>
            <Alert bsStyle="success">
              <strong>Your message has been sent! Rescuers left.</strong>
            </Alert>
          </div>
          <br/>
          <Button bsSize="large" block>
            Sign out
          </Button>
        </div>
      </div>
    );
  }
}

class Reg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      regname: '',
      password: '',
      autherror: null,
      authsuccess: null,
      username: null
    };

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    axios.get('https://api.siberiaq.com/zmaps/Reg/', {
      params: {
        login: this.state.login,
        name: this.state.regname,
        password: this.state.password
      }
    })
      .then(function (response) {
        if (response.data.status == 'complete') {
          var tabs = document.getElementsByClassName('nav nav-tabs')[0];
          tabs.style.display = 'none';
          self.setState({username: response.data.name});
          self.setState({authsuccess: true});
          setTimeout('window.location.reload()', 3000);
        } else if(response.data.status == 'error') {
          self.setState({autherror: response.data.message});
        } else {
          console.log('?');
        }
    })
  }
  handleChangeLogin(event) {
    this.setState({login: event.target.value});
    this.setState({autherror: null});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
    this.setState({autherror: null});
  }
  handleChangeName(event) {
      this.setState({regname: event.target.value});
      this.setState({autherror: null});
  }
  render() {
    return (
      <div>
        <Form style={this.state.authsuccess ? {display: 'none'} : {}} onSubmit={this.handleSubmit} horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={10}>
              <InputGroup>
                <FormControl name="login" type="text" value={this.state.login} onChange={this.handleChangeLogin} placeholder="Login" />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalName">
            <Col sm={10}>
              <InputGroup>
                <FormControl name="name" type="text" value={this.state.regname} onChange={this.handleChangeName} placeholder="Name" />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={10}>
              <InputGroup>
                <FormControl name="password" type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={10}>
              <Button bsSize="large" type="submit" block>
                Sign Up
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <div style={{width: 295}}>
          <Alert style={this.state.autherror ? {} : { display: 'none' }} bsStyle="danger">
            <strong>{this.state.autherror}</strong>
          </Alert>
        </div>
        <div style={{width: 295}} style={this.state.authsuccess ? {} : { display: 'none' }}>
          <Alert bsStyle="success">
            <strong>{this.state.username}, thank you for registration on Zombie Maps!</strong>
          </Alert>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Zombie Maps</h1>
        </header>
        <Grid>
          <Row style={{padding: 30}}>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <div id="mapp" style={{ display: 'none' }}>
              <YMaps>
                  <Map state={mapState} width={700} height={500}>
                    <Clusterer
                      options={{
                        preset: 'islands#invertedVioletClusterIcons',
                        groupByCoordinates: false,
                        clusterDisableClickZoom: true,
                        clusterHideIconOnBalloonOpen: false,
                        geoObjectHideIconOnBalloonOpen: false,
                      }}
                    >
                      {points.map((coordinates, idx) =>
                        <Placemark
                          key={idx}
                          geometry={{ coordinates }}
                          properties={getPointData(idx)}
                          options={getPointOptions()}
                        />
                      )}
                    </Clusterer>
                    <Circle
                      geometry={{
                        // The coordinates of the center of the circle.
                        coordinates: [55.76, 37.6],
                        // The radius of the circle in meters.
                        radius: 25000,
                      }}
                      properties={{
                        // Describing the properties of the circle.
                        // The contents of the balloon.
                        balloonContent: 'The radius of the infection - 25 km',
                        // The contents of the hint.
                      }}
                      options={{
                        // Setting the circle options.
                        // Enabling drag-n-drop for the circle.
                        draggable: true,
                        // Fill color. The last byte (77) defines transparency.
                        // The transparency of the fill can also be set using
                        // the option "fillOpacity".
                        fillColor: '#DB709377',
                        // Stroke color.
                        strokeColor: '#990066',
                        // Stroke transparency.
                        strokeOpacity: 0.8,
                        // The width of the stroke in pixels.
                        strokeWidth: 5,
                      }}
                    />
                  </Map>
                </YMaps>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div>
                <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                  <Tab style={{margin: 0}} eventKey={1} title="Sign In"><br/><Auth/></Tab>
                  <Tab eventKey={2} title="Sign Up"><br/><Reg/></Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
