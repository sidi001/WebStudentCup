import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/Login/Login.jsx';
import { Signup } from './components/Signup/Signup.jsx';
import Accueil from './components/Accueil/Accueil';
import { PrivateRoute } from './components/PrivateRoute.jsx';
import './App.css';
import Home from './components/Home/Home.jsx';

class App extends Component {
        render() {
        return (
        <div className="App">
            <div className="App-content">
                <Switch>  
                    <Route exact path="/" component={Accueil}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path ="/signup" component={Signup}/>
                    <PrivateRoute path='/:id/:at' component={Home} />
                </Switch>
            </div>
        </div>
        );
    }
}
export default App;