import React, { Component } from 'react';
import App from './pages/App';
import Signup from "./pages/Signuppage";
import Login from "./pages/Login";
import './images/App.css';
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom'

class routes extends Component {
  render() {
    return (
     
      <Router>
        <div  className="App">
        <Switch>
        <Route path="/dashboard" component={App} />
        <Route exact path="/" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/event" component ={App}/>
        <Route path="/invite/:uuid" component ={App}/>
        <Route path="/payment-plan" component={App}/>
         <Route path='/event-update' component={App}/> 
         <Route path="/eventhistory" component ={App}/>
         <Route path="/create-event" component ={App}/>

        
        </Switch>
          
        </div>
      </Router>

       

        
    
    );
  }
}

export default routes;
