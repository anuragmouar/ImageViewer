import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './login/Login';

// This is controller class to handle request and routing the pages
class Controller extends Component{

    constructor(){
        super()
        // This is the base URL to API
        this.baseUri = "https://api.instagram.com/v1/users/self/";
    }

    render(){
        return(
            <Router>
                <div className = 'main-container'>
                    <Route exact path = '/' render={(props) => <Login {...props} baseUrl = {this.baseUri}/>}/>
                </div>
            </Router>
        )
    }
}

export default Controller;