import React, { Component } from 'react';
// Import the Library
import Rave from 'react-flutterwave-rave'
import Library from '../library/Library';
import axios from 'axios'
 
class Ravepayment extends Component {
  constructor(props) {
    
    let email = JSON.parse(Library.getData('data'))
    super(props);
    this.state = {
      key: "FLWPUBK-6bf27b6975ea953bec1c1460193f0c2c-X", // RavePay PUBLIC KEY
    //   phone: "0000000000000",
      price: props.price,
      firstname:"chika",
      lastname:"iduma",
      email: email.email,
    }
    this.callback = this.callback.bind(this);
    this.close = this.close.bind(this);
  }
  


callback = (response) => {
    
    console.log(response);
    let ref = response.tx.txRef;
    let subscription = this.props.subscription;

    let data = {
        reference: ref,
        subscription: subscription
    };
      axios.post("http://198.58.110.127/jive-api/api/v1/payments/verify",data,{ headers: {'Authorization': Library.getData('oauth-token')} })
        .then(res => {
          console.log(res);
          console.log(res);
        })
    alert("Payment Successfull");
  
}
close = () => {
    console.log("Payment closed");
  }
 
  render() {
    return (
      <div className="App">
        <Rave
          pay_button_text="Pay With Rave"
          class="btn2 submit"
          metadata={[
            { metaname: 'Tickets', metavalue: this.state.ticket_number }
          ]}
          payment_method="card"
          customer_email={this.state.email}
          customer_phone={this.state.phone}
          amount={"" + this.state.price+ ""}
          ravePubKey={this.state.key}
          callback={this.callback}
          onclose={this.close}
        />
      </div>
    );
  }
}
 
export default Ravepayment;