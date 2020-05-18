import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import Profile from './profile/Profile';

// This is controller class to handle request and routing the pages
class Controller extends Component {

    constructor() {
        super()
        // This is the base URL to API
        this.baseUri = "https://api.instagram.com/v1/users/self/";
    }

    render() {
        return (
            <Router>
                <div className='main-container'>
                    <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUri} />} />
                    <Route exact path='/home' render={(props) => <Home {...props} baseUrl={this.baseUri} />} />
                    <Route exact path='/profile' render={(props) => <Profile {...props} baseUrl={this.baseUri} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;