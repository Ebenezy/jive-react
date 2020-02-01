import React, { Component } from 'react';
import  { Card  } from 'reactstrap';
import axios from 'axios';
import Subscriptiontable from '../components/dashbord/Subscription'
import Loader from 'react-loader-spinner'



class PaymentPlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      items:[],

      tooltipOpen: [false, false],
      tooltips: [
        {
          placement: 'top',
          text: 'Top',
        },
        {
          placement: 'bottom',
          text: 'Bottom',
        },
        {
          placement: 'left',
          text: 'Left',
        },
        {
          placement: 'right',
          text: 'Right',
        },
      ],
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount(){ 
   
    // let user = JSON.parse(sessionStorage.getItem('data'));
    // console.log(user);
    // const token = user;
    // console.log(token);
    let url='http://198.58.110.127/jive-api/api/v1/plans';
    axios.get( url)
    .then(res => {
        console.log(res.data.data);
       this.setState({
        items:res.data.data,
        loading: false,
        redirectToReferrer:false
    })
    }).catch(function (response) {
    

          //handle error
          console.log(response.message);
      });
  }
  subscriptionRow(){
    return this.state.items.map(function(object, i){
        return <Subscriptiontable obj={object} key={i} />;
    });
  }
  

  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      tooltipOpen: newArray,
    });
  }

  render() {
    let content;
    if(this.state.loading){
      content=<div> <Loader
        type="Oval"
         color="#00BFFF"
         height="100"	
         width="50"/>
         <h4>please wait...</h4>
         </div>
    }else{
       content =  <div className="animated fadeIn">
          <div className="container">
            <div className="row">
             {this.subscriptionRow()} 
         
            </div>
          </div>
        </div>
                
    }
    return (
      <div style={{textAlign:'center', justifyContent:'center',alignItems:"center"}} className="animated fadeIn">

      <h2 className="choose-plan">Choose Your Payment Plan</h2>
        {/* <Card> */}
         {/* {this.subscriptionRow()}  */}
        {/* <div className="animated fadeIn">
          <div style={{float:'left'}} className="container">
            <div className="row">
              
              {this.subscriptionRow()} 
            </div>
          </div>
        </div> */}
        {content}


       
        
      </div>
    );
  }
}

export default PaymentPlan;
