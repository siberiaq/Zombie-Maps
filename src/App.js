import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./bootstrap/css/bootstrap.css";
import { InputGroup, Navbar, Alert, NavItem, Nav, Grid, Row, Col, Button, Form, FormGroup, FormLabel, ControlLabel, FormControl, Checkbox} from "react-bootstrap";
import axios from 'axios';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';

const markerStyles = {
    width: '50px',
    height: '50px',
    overflow: 'visible'
};

const mapState = {
    controls: ['default']
};

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      autherror: null,
      authsuccess: null,
      username: null
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
  render() {
    return (
      <div>
        <Form style={this.state.authsuccess ? {display: 'none'} : {}} onSubmit={this.handleSubmit} horizontal>
          <FormGroup bsSize="large" controlId="formHorizontalEmail">
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Addon>@</InputGroup.Addon>
                <FormControl name="login" type="text" value={this.state.login} onChange={this.handleChangeLogin} placeholder="Email" />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup bsSize="large" controlId="formHorizontalPassword">
            <Col sm={10}>
              <InputGroup>
                <FormControl name="password" type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsSize="large" type="submit" block>
                Sign in
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
          <Button bsSize="large" block>
            Sign out
          </Button>
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
                <Map onAPIAvailable={function () { console.log('API loaded'); }} state={mapState} center={[33.557858, -84.684935]} zoom={8}>
                  <Marker lat={33.557858} lon={-84.684935}>
                    <MarkerLayout>
                      <img style={markerStyles} src="https://lh4.ggpht.com/sgCVzA-ij2wYAd5p0NhpcLDzw7wxWagjFCRlU92SVhgA4U35wdw7pHAz6-T49GX1C6M=w300"/>
                    </MarkerLayout>
                  </Marker>
                  <Marker lat={33.558859} lon={-83.684935}>
                    <MarkerLayout>
                      <img style={markerStyles} src="http://lh6.ggpht.com/IcOuvzMu4ARryJ8jlY9I0K-icSjJBU-zY64T4tRJakNA0-MPBR0HmkA_zqhVazxtYuo=w300"/>
                    </MarkerLayout>
                  </Marker>
                  <Marker lat={32.558859} lon={-85.684935}>
                  <MarkerLayout>
                    <img style={markerStyles} src="https://www.netfort.com/assets/zombie.png"/>
                  </MarkerLayout>
                </Marker>
                </Map>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <Auth/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;