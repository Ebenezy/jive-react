import React, { Component } from 'react';
import RavePayment from '../RavePayment';
import  '../../images/pay.css'



class Subscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fname: '',
          lname: '',
          username:'',
          email: '',
          showModal: false

         
         
        };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(event) {  // switch the value of the showModal state
      this.setState({
        showModal: !this.state.showModal
      });
    }
    getComponent() {
      if (this.state.showModal) {  // show the modal if state showModal is true
        return <RavePayment/>;
      } else {
        return null;
      }
    }

    
  

   

      
 
  render() {
    return (
      
     
        <div className="col-md-4">
        <div className="choose">
                    <h2 className="head-bg">{this.props.obj.name}</h2>
                    <p>N{this.props.obj.price}<span>/Monthly</span> </p>
                    <p>{this.props.obj.amount}<span>/Users</span></p>
                    <RavePayment price={this.props.obj.price} subscription={this.props.obj.uuid}/>
                    {this.getComponent()}
                  </div>

        </div>

       
        
    );
  }
}

export default Subscription;
