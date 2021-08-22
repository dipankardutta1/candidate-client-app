import React,{Component} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import intello from './images/intello_logo.png'

import './App.css';

import HeaderComponent from './component/HeaderComponent';
import ProfileComponentNew from './component/ProfileComponentNew';
import SearchComponent from './component/SearchComponent';
import HomeComponent from './component/HomeComponent';

import OAuth2Login from 'react-simple-oauth2-login';

import axios from 'axios';



class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false
    };

    updateAppState = updateAppState.bind(this);
  }

  

  

  componentDidMount(){

    

    const config = {
      baseURL: 'http://localhost:9999/',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization' : 'Bearer ' +  localStorage.getItem('token')
       
      }
    };

    const instance = axios.create(config);
    
    
    instance.get('auth/user/me').then(
      res => {
        this.setState(res.data)
      },
      err => {
        this.setState({authenticated: false})
      }
    )
    
  }

  

  onSuccess = response => {

    localStorage.setItem('token',response.access_token);

    const config = {
      baseURL: 'http://localhost:9999/',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization' : 'Bearer ' +  response.access_token
       
      }
    };

    const instance = axios.create(config);
    
    
    instance.get('auth/user/me').then(
      res => {
        //console.log("User -- " + res);
        this.setState(res.data)
      },
      err => {
        this.setState({authenticated: false});
      }
    )
   
    

    
  };
  onFailure = response => console.error("This is a fail" + response);

  render() {
  return (

   

    <div>
      {this.state.authenticated ?
      (
        <Router>
        <HeaderComponent />
        <div className="container-fluid display-table">
              <div className="row display-table-row">
              <div  className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                    <div className="logo">
                        <a href="home.html"><img src={intello} alt="Intello" className="hidden-xs hidden-sm" /> </a>
                    </div>
                    <div className="navi" style={{height: "1500px" }}>
                        <ul>
                            <li className="active">
                              
                              <Link to="/"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Home</span></Link>
                            </li>
                            <li>
                              <Link to="/profile"><i className="fa fa-user" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Profile</span></Link>
                            </li>
                            <li>
                              <Link to="/search"><i className="fa fa-user" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Search</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                  <div className="col-md-10 col-sm-11 display-table-cell v-align">
                     

                      <Switch>
                        <Route
                          exact
                          path="/"
                          render={() => {
                              return (
                                this.state.authenticated ?
                                <Redirect to="/home" /> :
                                <Redirect to="/search" /> 
                              )
                          }}
                        />
                        <Route exact path="/profile" component={ProfileComponentNew} />
                        <Route exact path="/search" component={SearchComponent} />
                        <Route exact path="/home" component={HomeComponent} />
                       
                      </Switch>



                  </div>
              </div>
          </div> 
          </Router>
      ) : (
        <OAuth2Login
          authorizationUrl="http://localhost:9999/auth/oauth/authorize"
          responseType="token"
          clientId="clientapp"
          redirectUri="http://localhost:3000/profile"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}/>
      )}
       
         
      </div>
  );
  }
}





export function updateAppState(text) { 
  this.setState(text)
}





export default App;
