// @flow
import React,{Component} from 'react';
import '../images/_misc.css'
import circle from '../images/circle.svg'
import face1 from "../images/face1.jpg"
import face2 from "../images/face2.jpg"
import face3 from "../images/face3.jpg"
import face4 from "../images/face4.jpg"
 import Library from '../library/Library';
import axios from 'axios'
import Eventdashboard from '../components/dashbord/EventDashboard'
import WalletHistory from '../components/dashbord/Walletdashboard'




export default class Home extends React.Component{

  constructor(props) {
        super(props);
    
        this.state = {
          balance:"",
          verified_invite:"",
          events_created:"",
          links_created:'',
          items:[],
          wallet:[]
        };
      }

    componentDidMount(){ 
    if(Library.getData('oauth-token'))
    {
    // let user = JSON.parse(sessionStorage.getItem('data'));
    // console.log(user);
    // const token = user;
    // console.log(token);
    axios.get("http://198.58.110.127/jive-api/api/v1/user/authorize", { headers: {"Authorization" :Library.getData("oauth-token")} })
    .then(res => {
        // console.log(res.data.message.details);
        let data = res.data.message.details;
        Library.setData('data',JSON.stringify(res.data.message.details))
        console.log(res);


    this.setState({
        fname:data.fname,
        lname:data.lname,
        username:data.username,
        email:data.email,
        balance:data.balance,
        verified_invite:data.verified_invite,
        events_created:data.events_created,
        links_created:data.links_created,
        items:data.events,
        wallet:data.wallet_history
    })
    }).catch(error => this.setState({
       error,
       isLoading: false 
      
    }));
   

}

}
tabRow(){
  return this.state.items.map(function(object, i){
      return <Eventdashboard obj={object} key={i} />;
  });
}
walletRow(){
  return this.state.wallet.map(function(object, i){
      return <WalletHistory obj={object} key={i} />;
  });
}


  


  render(){

    return(
      <div className="main-panel">
      <div className="content-wrapper">
    <div className="page-header">
  <h3 className="page-title">
  <span className="page-title-icon bg-gradient-primary text-white mr-2">
    <i className="fa fa-home"></i>                 
  </span>
  Dashboard
</h3>
</div>
<div className="row">
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-info card-img-holder text-white">
                            <div className="card-body">
                                <img src={circle} className="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 className="font-weight-normal mb-3">Wallet Balance
                                    <i className="fa fa-money mdi-18px float-right"></i>
                                </h4>
                                <h2 className="mb-5">N{this.state.balance||0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                            <img src={circle} className="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 className="font-weight-normal mb-3">Verified Invite
                                    <i className="fa fa-bookmark-o mdi-18px float-right"></i>
                                </h4>
                                <h2 className="mb-5">{this.state.verified_invite || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-success card-img-holder text-white">
                            <div className="card-body">
                                <img src={circle} className="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 className="font-weight-normal mb-3">Event Created
                                    <i className="fa fa-diamond mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5"> {this.state.events_created || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 stretch-card grid-margin">
                        <div class="card bg-gradient-primary card-img-holder text-white">
                            <div class="card-body">
                                <img src={circle} class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3"> Link Created
                                    <i class="fa fa-diamond mdi-18px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{this.state.links_created || 0}</h2>
                            </div>
                        </div>
                    </div>
                </div>
           
                
<div class="row">
  <div class="col-12 grid-margin">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Recent Event</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                  Logo
                </th>
                <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                  Event
                </th>
                <th style={{fontSize:"20px", fontFamily:"Ubuntu"}}>
                  Start Date
                </th>
                <th style={{fontSize:"20px" ,fontFamily:"Ubuntu"}}>
                  End Date
                </th>
                <th style={{fontSize:"20px", fontFamily:"Ubuntu"}}>
                Action
              </th>
              </tr>
            </thead>
            <tbody>
            {this.tabRow()}
          </tbody>
          
          </table>
        </div>

      </div>
    </div>
  </div>
</div>
 <div class="row">
    <div class="col-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Wallet History</h4>
                <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                           Reference
                          </th>
                          <th style={{fontSize:"20px", fontFamily:"Ubuntu"}}>
                            Description
                          </th>
                          <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                           Type
                          </th>
                          <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                          Amount Paid
                          </th>
                          <th style={{fontSize:"20px",fontFamily:"Ubuntu"}}>
                          Unit worth
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        
                      {this.walletRow()}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </div>
 
</div>
</div>


    )
  }
}




// import React, { Component } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import Library from '../library/Library';
// import CountTo from 'react-count-to';
// import {
//   Badge,
//   Button,
//   ButtonGroup,
//   ButtonToolbar,
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   Col,
//   Progress,
//   Row,
//   Table,
// } from 'reactstrap';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
// // import Widget03  from '../library/Widget03'
// import axios from 'axios'

// //  const Widget03 = lazy(() => import('../library/Widget03'));

// const brandPrimary = getStyle('--primary')
// const brandSuccess = getStyle('--success')
// const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
// const brandDanger = getStyle('--danger')

// // Card Chart 1
// const cardChartData1 = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: brandPrimary,
//       borderColor: 'rgba(255,255,255,.55)',
//       data: [65, 59, 84, 84, 51, 55, 40],
//     },
//   ],
// };

// const cardChartOpts1 = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   maintainAspectRatio: false,
//   legend: {
//     display: false,
//   },
//   scales: {
//     xAxes: [
//       {
//         gridLines: {
//           color: 'transparent',
//           zeroLineColor: 'transparent',
//         },
//         ticks: {
//           fontSize: 2,
//           fontColor: 'transparent',
//         },

//       }],
//     yAxes: [
//       {
//         display: false,
//         ticks: {
//           display: false,
//           min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
//           max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
//         },
//       }],
//   },
//   elements: {
//     line: {
//       borderWidth: 1,
//     },
//     point: {
//       radius: 4,
//       hitRadius: 10,
//       hoverRadius: 4,
//     },
//   }
// }


// // Card Chart 2
// const cardChartData2 = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: brandInfo,
//       borderColor: 'rgba(255,255,255,.55)',
//       data: [1, 18, 9, 17, 34, 22, 11],
//     },
//   ],
// };

// const cardChartOpts2 = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   maintainAspectRatio: false,
//   legend: {
//     display: false,
//   },
//   scales: {
//     xAxes: [
//       {
//         gridLines: {
//           color: 'transparent',
//           zeroLineColor: 'transparent',
//         },
//         ticks: {
//           fontSize: 2,
//           fontColor: 'transparent',
//         },

//       }],
//     yAxes: [
//       {
//         display: false,
//         ticks: {
//           display: false,
//           min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
//           max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
//         },
//       }],
//   },
//   elements: {
//     line: {
//       tension: 0.00001,
//       borderWidth: 1,
//     },
//     point: {
//       radius: 4,
//       hitRadius: 10,
//       hoverRadius: 4,
//     },
//   },
// };

// // Card Chart 3
// const cardChartData3 = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgba(255,255,255,.2)',
//       borderColor: 'rgba(255,255,255,.55)',
//       data: [78, 81, 80, 45, 34, 12, 40],
//     },
//   ],
// };

// const cardChartOpts3 = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   maintainAspectRatio: false,
//   legend: {
//     display: false,
//   },
//   scales: {
//     xAxes: [
//       {
//         display: false,
//       }],
//     yAxes: [
//       {
//         display: false,
//       }],
//   },
//   elements: {
//     line: {
//       borderWidth: 2,
//     },
//     point: {
//       radius: 0,
//       hitRadius: 10,
//       hoverRadius: 4,
//     },
//   },
// };

// // Card Chart 4
// const cardChartData4 = {
//   labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgba(255,255,255,.3)',
//       borderColor: 'transparent',
//       data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
//     },
//   ],
// };

// const cardChartOpts4 = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   maintainAspectRatio: false,
//   legend: {
//     display: false,
//   },
//   scales: {
//     xAxes: [
//       {
//         display: false,
//         barPercentage: 0.6,
//       }],
//     yAxes: [
//       {
//         display: false,
//       }],
//   },
// };

// // Social Box Chart
// const socialBoxData = [
//   { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
//   { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
//   { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
//   { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
// ];

// const makeSocialBoxData = (dataSetNo) => {
//   const dataset = socialBoxData[dataSetNo];
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         backgroundColor: 'rgba(255,255,255,.1)',
//         borderColor: 'rgba(255,255,255,.55)',
//         pointHoverBackgroundColor: '#fff',
//         borderWidth: 2,
//         data: dataset.data,
//         label: dataset.label,
//       },
//     ],
//   };
//   return () => data;
// };

// const socialChartOpts = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   responsive: true,
//   maintainAspectRatio: false,
//   legend: {
//     display: false,
//   },
//   scales: {
//     xAxes: [
//       {
//         display: false,
//       }],
//     yAxes: [
//       {
//         display: false,
//       }],
//   },
//   elements: {
//     point: {
//       radius: 0,
//       hitRadius: 10,
//       hoverRadius: 4,
//       hoverBorderWidth: 3,
//     },
//   },
// };

// // sparkline charts
// const sparkLineChartData = [
//   {
//     data: [35, 23, 56, 22, 97, 23, 64],
//     label: 'New Clients',
//   },
//   {
//     data: [65, 59, 84, 84, 51, 55, 40],
//     label: 'Recurring Clients',
//   },
//   {
//     data: [35, 23, 56, 22, 97, 23, 64],
//     label: 'Pageviews',
//   },
//   {
//     data: [65, 59, 84, 84, 51, 55, 40],
//     label: 'Organic',
//   },
//   {
//     data: [78, 81, 80, 45, 34, 12, 40],
//     label: 'CTR',
//   },
//   {
//     data: [1, 13, 9, 17, 34, 41, 38],
//     label: 'Bounce Rate',
//   },
// ];

// const makeSparkLineData = (dataSetNo, variant) => {
//   const dataset = sparkLineChartData[dataSetNo];
//   const data = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     datasets: [
//       {
//         backgroundColor: 'transparent',
//         borderColor: variant ? variant : '#c2cfd6',
//         data: dataset.data,
//         label: dataset.label,
//       },
//     ],
//   };
//   return () => data;
// };

// const sparklineChartOpts = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   responsive: true,
//   maintainAspectRatio: true,
//   scales: {
//     xAxes: [
//       {
//         display: false,
//       }],
//     yAxes: [
//       {
//         display: false,
//       }],
//   },
//   elements: {
//     line: {
//       borderWidth: 2,
//     },
//     point: {
//       radius: 0,
//       hitRadius: 10,
//       hoverRadius: 4,
//       hoverBorderWidth: 3,
//     },
//   },
//   legend: {
//     display: false,
//   },
// };

// // Main Chart

// //Random Numbers
// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// var elements = 27;
// var data1 = [];
// var data2 = [];
// var data3 = [];

// for (var i = 0; i <= elements; i++) {
//   data1.push(random(50, 200));
//   data2.push(random(80, 100));
//   data3.push(65);
// }

// const mainChart = {
//   labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: hexToRgba(brandInfo, 10),
//       borderColor: brandInfo,
//       pointHoverBackgroundColor: '#fff',
//       borderWidth: 2,
//       data: data1,
//     },
//     {
//       label: 'My Second dataset',
//       backgroundColor: 'transparent',
//       borderColor: brandSuccess,
//       pointHoverBackgroundColor: '#fff',
//       borderWidth: 2,
//       data: data2,
//     },
//     {
//       label: 'My Third dataset',
//       backgroundColor: 'transparent',
//       borderColor: brandDanger,
//       pointHoverBackgroundColor: '#fff',
//       borderWidth: 1,
//       borderDash: [8, 5],
//       data: data3,
//     },
//   ],
// };

// const mainChartOpts = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips,
//     intersect: true,
//     mode: 'index',
//     position: 'nearest',
//     callbacks: {
//       labelColor: function(tooltipItem, chart) {
//         return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
//       }
//     }
//   },
//   maintainAspectRatio: false,
//   legend: {
//     display: false,
//   },
//   scales: {
//     xAxes: [
//       {
//         gridLines: {
//           drawOnChartArea: false,
//         },
//       }],
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//           maxTicksLimit: 5,
//           stepSize: Math.ceil(250 / 5),
//           max: 250,
//         },
//       }],
//   },
//   elements: {
//     point: {
//       radius: 0,
//       hitRadius: 10,
//       hoverRadius: 4,
//       hoverBorderWidth: 3,
//     },
//   },
// };

// class Dashboard extends Component   {
  

//   constructor(props) {
//     super(props);
//   this.toggle = this.toggle.bind(this);
//     this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

//     this.state = {
//       dropdownOpen: false,
//       radioSelected: 2,
//        balance:"",
//       verified_invite:"",
//       events_created:"",
//       links_created:''
//     };
//   }

//   toggle() {
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen,
//     });
//   }

//   onRadioBtnClick(radioSelected) {
//     this.setState({
//       radioSelected: radioSelected,
//     });
//   }

//   componentDidMount(){ 
//     if(Library.getData('oauth-token'))
//     {
//     // let user = JSON.parse(sessionStorage.getItem('data'));
//     // console.log(user);
//     // const token = user;
//     // console.log(token);
//     axios.get("http://jive-core.herokuapp.com/api/v1/user/authorize", { headers: {"Authorization" :Library.getData("oauth-token")} })
//     .then(res => {
//         // console.log(res.data.message.details);
//         let data = res.data.message.details;
//         Library.setData('data',JSON.stringify(res.data.message.details))
//         console.log(res);


//     this.setState({
//         fname:data.fname,
//         lname:data.lname,
//         username:data.username,
//         email:data.email,
//         balance:data.balance,
//         verified_invite:data.verified_invite,
//         events_created:data.events_created,
//         links_created:data.links_created
//     })
//     }).catch(error => this.setState({
//        error,
//        isLoading: false 
      
//     }));

// }
//   }


//   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

//   render() {

//     return (
//       <div className="animated fadeIn">
//         <Row>
//           <Col xs="12" sm="6" lg="3">
//             <Card className="text-white bg-info">
//               <CardBody className="pb-0">
//                 {/* <ButtonGroup className="float-right">
//                   <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
//                     <DropdownToggle caret className="p-0" color="transparent">
//                       <i className="icon-settings"></i>
//                     </DropdownToggle>
//                     <DropdownMenu right>
//                       <DropdownItem>Action</DropdownItem>
//                       <DropdownItem>Another action</DropdownItem>
//                       <DropdownItem disabled>Disabled action</DropdownItem>
//                       <DropdownItem>Something else here</DropdownItem>
//                     </DropdownMenu>
//                   </ButtonDropdown>
//                 </ButtonGroup> */}

//                 <div  
//                 style={{fontFamily:'Montserrat'}} 
//                 className="text-value">
//                 <CountTo to={this.state.balance} speed={1234} />
//                 </div>
//                 <div  style={{fontFamily:'Montserrat'}}>Wallet Balance</div>
//               </CardBody>
//               <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
//                 <Line data={cardChartData2} options={cardChartOpts2} height={70} />
//               </div>
//             </Card>
//           </Col>

//           <Col xs="12" sm="6" lg="3">
//             <Card className="text-white bg-primary">
//               <CardBody className="pb-0">
//                 {/* <ButtonGroup className="float-right">
//                   <Dropdown id='card2' isOpen={this.state.card2} toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
//                     <DropdownToggle className="p-0" color="transparent">
//                       <i className="icon-location-pin"></i>
//                     </DropdownToggle>
//                     <DropdownMenu right>
//                       <DropdownItem>Action</DropdownItem>
//                       <DropdownItem>Another action</DropdownItem>
//                       <DropdownItem>Something else here</DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </ButtonGroup> */}
//                 <div style={{fontFamily:'Montserrat'}} className="text-value">
               
//                 <CountTo to={this.state.verified_invite} speed={1234} />
//                 </div>
//                 <div style={{fontFamily:'Montserrat'}}>Verified Invite</div>
//               </CardBody>
//               <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
//                 <Line data={cardChartData1} options={cardChartOpts1} height={70} />
//               </div>
//             </Card>
//           </Col>

//           <Col xs="12" sm="6" lg="3">
//             <Card className="text-white bg-warning">
//               <CardBody className="pb-0">
//                 {/* <ButtonGroup className="float-right">
//                   <Dropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
//                     <DropdownToggle caret className="p-0" color="transparent">
//                       <i className="icon-settings"></i>
//                     </DropdownToggle>
//                     <DropdownMenu right>
//                       <DropdownItem>Action</DropdownItem>
//                       <DropdownItem>Another action</DropdownItem>
//                       <DropdownItem>Something else here</DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </ButtonGroup> */}
//                 <div style={{fontFamily:'Montserrat'}} className="text-value">
//                 <CountTo to={this.state.events_created} speed={1234} />
//                 </div>
//                 <div style={{fontFamily:'Montserrat'}}>Event Created</div>
//               </CardBody>
//               <div className="chart-wrapper" style={{ height: '70px' }}>
//                 <Line data={cardChartData3} options={cardChartOpts3} height={70} />
//               </div>
//             </Card>
//           </Col>

//           <Col xs="12" sm="6" lg="3">
//             <Card className="text-white bg-danger">
//               <CardBody className="pb-0">
//                 <ButtonGroup className="float-right">
//                   {/* <ButtonDropdown id='card4' isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
//                     <DropdownToggle caret className="p-0" color="transparent">
//                       <i className="icon-settings"></i>
//                     </DropdownToggle>
//                     <DropdownMenu right>
//                       <DropdownItem>Action</DropdownItem>
//                       <DropdownItem>Another action</DropdownItem>
//                       <DropdownItem>Something else here</DropdownItem>
//                     </DropdownMenu>
//                   </ButtonDropdown> */}
//                 </ButtonGroup>
//                 <div style={{fontFamily:'Montserrat'}} className="text-value">
//                 <CountTo to={this.state.links_created} speed={1234} />
//                 </div>
//                 <div style={{fontFamily:'Montserrat'}}>Links Created</div>
//               </CardBody>
//               <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
//                 <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
//               </div>
//             </Card>
//           </Col>
//         </Row>
//         <Row style={{marginTop:15}}>
//           <Col>
//             <Card>
//               <CardBody>
//                 <Row>
//                   <Col sm="5">
//                     <CardTitle style={{fontFamily:'Montserrat'}} className="mb-0">Traffic</CardTitle>
//                     <div  style={{fontFamily:'Montserrat'}}className="small text-muted">November 2015</div>
//                   </Col>
//                   <Col sm="7" className="d-none d-sm-inline-block">
//                     <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
//                     <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
//                       <ButtonGroup className="mr-3" aria-label="First group">
//                         <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
//                         <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
//                         <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
//                       </ButtonGroup>
//                     </ButtonToolbar>
//                   </Col>
//                 </Row>
//                 <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
//                   <Line data={mainChart} options={mainChartOpts} height={300} />
//                 </div>
//               </CardBody>
//               <CardFooter>
//                 <Row className="text-center">
//                   <Col sm={12} md className="mb-sm-2 mb-0">
//                     <div style={{fontFamily:'Montserrat'}}className="text-muted">Visits</div>
//                     <strong style={{fontFamily:'Montserrat'}}>29.703 Users (40%)</strong>
//                     <Progress className="progress-xs mt-2" color="success" value="40" />
//                   </Col>
//                   <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
//                     <div style={{fontFamily:'Montserrat'}} className="text-muted">Unique</div>
//                     <strong style={{fontFamily:'Montserrat'}}>24.093 Users (20%)</strong>
//                     <Progress className="progress-xs mt-2" color="info" value="20" />
//                   </Col>
//                   <Col sm={12} md className="mb-sm-2 mb-0">
//                     <div className="text-muted">Pageviews</div>
//                     <strong style={{fontFamily:'Montserrat'}}>78.706 Views (60%)</strong>
//                     <Progress className="progress-xs mt-2" color="warning" value="60" />
//                   </Col>
//                   <Col sm={12} md className="mb-sm-2 mb-0">
//                     <div style={{fontFamily:'Montserrat'}} className="text-muted">New Users</div>
//                     <strong style={{fontFamily:'Montserrat'}}>22.123 Users (80%)</strong>
//                     <Progress className="progress-xs mt-2" color="danger" value="80" />
//                   </Col>
//                   <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
//                     <div style={{fontFamily:'Montserrat'}} className="text-muted">Bounce Rate</div>
//                     <strong style={{fontFamily:'Montserrat'}}>Average Rate (40.15%)</strong>
//                     <Progress className="progress-xs mt-2" color="primary" value="40" />
//                   </Col>
//                 </Row>
//               </CardFooter>
//             </Card>
//           </Col>
//         </Row>

        
//         <Row>
//           <Col>
//             <Card>
//               <CardHeader>
//                 Traffic {' & '} Sales
//               </CardHeader>
//               <CardBody>
//                 <Row>
//                   <Col xs="12" md="6" xl="6">
//                     <Row>
//                       <Col sm="6">
//                         <div className="callout callout-info">
//                           <small className="text-muted">New Clients</small>
//                           <br />
//                           <strong className="h4">9,123</strong>
//                           <div className="chart-wrapper">
//                             <Line data={makeSparkLineData(0, brandPrimary)} options={sparklineChartOpts} width={100} height={30} />
//                           </div>
//                         </div>
//                       </Col>
//                       <Col sm="6">
//                         <div className="callout callout-danger">
//                           <small className="text-muted">Recurring Clients</small>
//                           <br />
//                           <strong className="h4">22,643</strong>
//                           <div className="chart-wrapper">
//                             <Line data={makeSparkLineData(1, brandDanger)} options={sparklineChartOpts} width={100} height={30} />
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <hr className="mt-0" />
//                     <div className="progress-group mb-4">
//                       <div className="progress-group-prepend">
//                         <span className="progress-group-text">
//                           Monday
//                         </span>
//                       </div>
//                       <div className="progress-group-bars">
//                         <Progress className="progress-xs" color="info" value="34" />
//                         <Progress className="progress-xs" color="danger" value="78" />
//                       </div>
//                     </div>
//                     <div className="progress-group mb-4">
//                       <div className="progress-group-prepend">
//                         <span className="progress-group-text">
//                         Tuesday
//                         </span>
//                       </div>
//                       <div className="progress-group-bars">
//                         <Progress className="progress-xs" color="info" value="56" />
//                         <Progress className="progress-xs" color="danger" value="94" />
//                       </div>
//                     </div>
//                     <div className="progress-group mb-4">
//                       <div className="progress-group-prepend">
//                         <span className="progress-group-text">
//                         Wednesday
//                         </span>
//                       </div>
//                       <div className="progress-group-bars">
//                         <Progress className="progress-xs" color="info" value="12" />
//                         <Progress className="progress-xs" color="danger" value="67" />
//                       </div>
//                     </div>
//                     <div className="progress-group mb-4">
//                       <div className="progress-group-prepend">
//                         <span className="progress-group-text">
//                         Thursday
//                         </span>
//                       </div>
//                       <div className="progress-group-bars">
//                         <Progress className="progress-xs" color="info" value="43" />
//                         <Progress className="progress-xs" color="danger" value="91" />
//                       </div>
//                     </div>
//                     <div className="progress-group mb-4">
//                       <div className="progress-group-prepend">
//                         <span className="progress-group-text">
//                         Friday
//                         </span>
//                       </div>
//                       <div className="progress-group-bars">
//                         <Progress className="progress-xs" color="info" value="22" />
//                         <Progress className="progress-xs" color="danger" value="73" />
//                       </div>
//                     </div>
//                     <div className="progress-group mb-4">
//                       <div className="progress-group-prepend">
//                         <span className="progress-group-text">
//                         Saturday
//                         </span>
//                       </div>
//                       <div className="progress-group-bars">
//                         <Progress className="progress-xs" color="info" value="53" />
//                         <Progress className="progress-xs" color="danger" value="82" />
//                       </div>
//                     </div>
//                     <div className="progress-group mb-4">
//                       <div className="progress-group-prepend">
//                         <span className="progress-group-text">
//                         Sunday
//                         </span>
//                       </div>
//                       <div className="progress-group-bars">
//                         <Progress className="progress-xs" color="info" value="9" />
//                         <Progress className="progress-xs" color="danger" value="69" />
//                       </div>
//                     </div>
//                     <div className="legend text-center">
//                       <small>
//                         <sup className="px-1"><Badge pill color="info">&nbsp;</Badge></sup>
//                         New clients
//                         &nbsp;
//                         <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
//                         Recurring clients
//                       </small>
//                     </div>
//                   </Col>
//                   <Col xs="12" md="6" xl="6">
//                     <Row>
//                       <Col sm="6">
//                         <div className="callout callout-warning">
//                           <small className="text-muted">Pageviews</small>
//                           <br />
//                           <strong className="h4">78,623</strong>
//                           <div className="chart-wrapper">
//                             <Line data={makeSparkLineData(2, brandWarning)} options={sparklineChartOpts} width={100} height={30} />
//                           </div>
//                         </div>
//                       </Col>
//                       <Col sm="6">
//                         <div className="callout callout-success">
//                           <small className="text-muted">Organic</small>
//                           <br />
//                           <strong className="h4">49,123</strong>
//                           <div className="chart-wrapper">
//                             <Line data={makeSparkLineData(3, brandSuccess)} options={sparklineChartOpts} width={100} height={30} />
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <hr className="mt-0" />
//                     <ul>
//                       <div className="progress-group">
//                         <div className="progress-group-header">
//                           <i className="icon-user progress-group-icon"></i>
//                           <span className="title">Male</span>
//                           <span className="ml-auto font-weight-bold">43%</span>
//                         </div>
//                         <div className="progress-group-bars">
//                           <Progress className="progress-xs" color="warning" value="43" />
//                         </div>
//                       </div>
//                       <div className="progress-group mb-5">
//                         <div className="progress-group-header">
//                           <i className="icon-user-female progress-group-icon"></i>
//                           <span className="title">Female</span>
//                           <span className="ml-auto font-weight-bold">37%</span>
//                         </div>
//                         <div className="progress-group-bars">
//                           <Progress className="progress-xs" color="warning" value="37" />
//                         </div>
//                       </div>
//                       <div className="progress-group">
//                         <div className="progress-group-header">
//                           <i className="icon-globe progress-group-icon"></i>
//                           <span className="title">Organic Search</span>
//                           <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
//                         </div>
//                         <div className="progress-group-bars">
//                           <Progress className="progress-xs" color="success" value="56" />
//                         </div>
//                       </div>
//                       <div className="progress-group">
//                         <div className="progress-group-header">
//                           <i className="icon-social-facebook progress-group-icon"></i>
//                           <span className="title">Facebook</span>
//                           <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
//                         </div>
//                         <div className="progress-group-bars">
//                           <Progress className="progress-xs" color="success" value="15" />
//                         </div>
//                       </div>
//                       <div className="progress-group">
//                         <div className="progress-group-header">
//                           <i className="icon-social-twitter progress-group-icon"></i>
//                           <span className="title">Twitter</span>
//                           <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
//                         </div>
//                         <div className="progress-group-bars">
//                           <Progress className="progress-xs" color="success" value="11" />
//                         </div>
//                       </div>
//                       <div className="progress-group">
//                         <div className="progress-group-header">
//                           <i className="icon-social-linkedin progress-group-icon"></i>
//                           <span className="title">LinkedIn</span>
//                           <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
//                         </div>
//                         <div className="progress-group-bars">
//                           <Progress className="progress-xs" color="success" value="8" />
//                         </div>
//                       </div>
//                       <div className="divider text-center">
//                         <Button color="link" size="sm" className="text-muted" data-toggle="tooltip" data-placement="top"
//                                 title="" data-original-title="show more"><i className="icon-options"></i></Button>
//                       </div>
//                     </ul>
//                   </Col>
//                 </Row>
//                 <br />
//                 <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
//                   <thead className="thead-light">
//                   <tr>
//                     <th className="text-center"><i className="icon-people"></i></th>
//                     <th>User</th>
//                     <th className="text-center">Country</th>
//                     <th>Usage</th>
//                     <th className="text-center">Payment Method</th>
//                     <th>Activity</th>
//                   </tr>
//                   </thead>
//                   <tbody>
//                   <tr>
//                     <td className="text-center">
//                       <div className="avatar">
//                         <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
//                         <span className="avatar-status badge-success"></span>
//                       </div>
//                     </td>
//                     <td>
//                       <div>Yiorgos Avraamu</div>
//                       <div className="small text-muted">
//                         <span>New</span> | Registered: Jan 1, 2015
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
//                     </td>
//                     <td>
//                       <div className="clearfix">
//                         <div className="float-left">
//                           <strong>50%</strong>
//                         </div>
//                         <div className="float-right">
//                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
//                         </div>
//                       </div>
//                       <Progress className="progress-xs" color="success" value="50" />
//                     </td>
//                     <td className="text-center">
//                       <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
//                     </td>
//                     <td>
//                       <div className="small text-muted">Last login</div>
//                       <strong>10 sec ago</strong>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-center">
//                       <div className="avatar">
//                         <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
//                         <span className="avatar-status badge-danger"></span>
//                       </div>
//                     </td>
//                     <td>
//                       <div>Avram Tarasios</div>
//                       <div className="small text-muted">

//                         <span>Recurring</span> | Registered: Jan 1, 2015
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <i className="flag-icon flag-icon-br h4 mb-0" title="br" id="br"></i>
//                     </td>
//                     <td>
//                       <div className="clearfix">
//                         <div className="float-left">
//                           <strong>10%</strong>
//                         </div>
//                         <div className="float-right">
//                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
//                         </div>
//                       </div>
//                       <Progress className="progress-xs" color="info" value="10" />
//                     </td>
//                     <td className="text-center">
//                       <i className="fa fa-cc-visa" style={{ fontSize: 24 + 'px' }}></i>
//                     </td>
//                     <td>
//                       <div className="small text-muted">Last login</div>
//                       <strong>5 minutes ago</strong>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-center">
//                       <div className="avatar">
//                         <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
//                         <span className="avatar-status badge-warning"></span>
//                       </div>
//                     </td>
//                     <td>
//                       <div>Quintin Ed</div>
//                       <div className="small text-muted">
//                         <span>New</span> | Registered: Jan 1, 2015
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <i className="flag-icon flag-icon-in h4 mb-0" title="in" id="in"></i>
//                     </td>
//                     <td>
//                       <div className="clearfix">
//                         <div className="float-left">
//                           <strong>74%</strong>
//                         </div>
//                         <div className="float-right">
//                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
//                         </div>
//                       </div>
//                       <Progress className="progress-xs" color="warning" value="74" />
//                     </td>
//                     <td className="text-center">
//                       <i className="fa fa-cc-stripe" style={{ fontSize: 24 + 'px' }}></i>
//                     </td>
//                     <td>
//                       <div className="small text-muted">Last login</div>
//                       <strong>1 hour ago</strong>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-center">
//                       <div className="avatar">
//                         <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
//                         <span className="avatar-status badge-secondary"></span>
//                       </div>
//                     </td>
//                     <td>
//                       <div>Enéas Kwadwo</div>
//                       <div className="small text-muted">
//                         <span>New</span> | Registered: Jan 1, 2015
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <i className="flag-icon flag-icon-fr h4 mb-0" title="fr" id="fr"></i>
//                     </td>
//                     <td>
//                       <div className="clearfix">
//                         <div className="float-left">
//                           <strong>98%</strong>
//                         </div>
//                         <div className="float-right">
//                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
//                         </div>
//                       </div>
//                       <Progress className="progress-xs" color="danger" value="98" />
//                     </td>
//                     <td className="text-center">
//                       <i className="fa fa-paypal" style={{ fontSize: 24 + 'px' }}></i>
//                     </td>
//                     <td>
//                       <div className="small text-muted">Last login</div>
//                       <strong>Last month</strong>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-center">
//                       <div className="avatar">
//                         <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
//                         <span className="avatar-status badge-success"></span>
//                       </div>
//                     </td>
//                     <td>
//                       <div>Agapetus Tadeáš</div>
//                       <div className="small text-muted">
//                         <span>New</span> | Registered: Jan 1, 2015
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <i className="flag-icon flag-icon-es h4 mb-0" title="es" id="es"></i>
//                     </td>
//                     <td>
//                       <div className="clearfix">
//                         <div className="float-left">
//                           <strong>22%</strong>
//                         </div>
//                         <div className="float-right">
//                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
//                         </div>
//                       </div>
//                       <Progress className="progress-xs" color="info" value="22" />
//                     </td>
//                     <td className="text-center">
//                       <i className="fa fa-google-wallet" style={{ fontSize: 24 + 'px' }}></i>
//                     </td>
//                     <td>
//                       <div className="small text-muted">Last login</div>
//                       <strong>Last week</strong>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="text-center">
//                       <div className="avatar">
//                         <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
//                         <span className="avatar-status badge-danger"></span>
//                       </div>
//                     </td>
//                     <td>
//                       <div>Friderik Dávid</div>
//                       <div className="small text-muted">
//                         <span>New</span> | Registered: Jan 1, 2015
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <i className="flag-icon flag-icon-pl h4 mb-0" title="pl" id="pl"></i>
//                     </td>
//                     <td>
//                       <div className="clearfix">
//                         <div className="float-left">
//                           <strong>43%</strong>
//                         </div>
//                         <div className="float-right">
//                           <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
//                         </div>
//                       </div>
//                       <Progress className="progress-xs" color="success" value="43" />
//                     </td>
//                     <td className="text-center">
//                       <i className="fa fa-cc-amex" style={{ fontSize: 24 + 'px' }}></i>
//                     </td>
//                     <td>
//                       <div className="small text-muted">Last login</div>
//                       <strong>Yesterday</strong>
//                     </td>
//                   </tr>
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }

// export default Dashboard;



// // import React, {Component} from 'react';
// // import { cyan, pink, purple, orange } from "@material-ui/core/colors";
// // import Assessment from "@material-ui/icons/Assessment";
// // import Face from "@material-ui/icons/Face";
// // import ThumbUp from "@material-ui/icons/ThumbUp";
// // import ShoppingCart from "@material-ui/icons/ShoppingCart";
// // import InfoBox from "../components/dashbord/InfoBox";
// // import NewOrders from "../components/dashbord/NewOrders";
// // import MonthlySales from "../components/dashbord/MonthlySales";
// // import BrowserUsage from "../components/dashbord/BrowserUsage";
// // import RecentlyProducts from "../components/dashbord/RecentlyProducts";
// // import globalStyles from "../styles";
// // import Grid from "@material-ui/core/Grid";
// // import Data from "../data";
// // import {Button} from "@material-ui/core"
// // import { fade } from "@material-ui/core/styles/colorManipulator";
// // import { withStyles } from "@material-ui/core/styles";
// // import InputBase from "@material-ui/core/InputBase";
// // import SearchIcon from "@material-ui/icons/Search";
// // import {Link} from 'react-router-dom';
// // const styles = theme => ({
// //   appBar: {
// //     zIndex: theme.zIndex.drawer + 1,
// //     transition: theme.transitions.create(["width", "margin"], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.leavingScreen
// //     })
// //   },
// //   appBarShift: {
// //     // marginLeft: theme.drawer.width,
// //     width: `calc(100% - ${theme.drawer.width}px)`,
// //     transition: theme.transitions.create(["width", "margin"], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen
// //     })
// //   },
// //   root: {
// //     width: "100%"
// //   },
// //   grow: {
// //     flexGrow: 1
// //   },
// //   menuButton: {
// //     marginLeft: -12,
// //     marginRight: 20
// //   },
// //   title: {
// //     display: "none",
// //     [theme.breakpoints.up("sm")]: {
// //       display: "block"
// //     }
// //   },
// //   search: {
// //     position: "relative",
// //     borderRadius: theme.shape.borderRadius,
// //     borderColor:'#000',
// //     borderBottomColor:'#000',
// //     // backgroundColor: fade(theme.palette.common.white, 0.15),

// //     // "&:hover": {
// //     //   backgroundColor: fade(theme.palette.common.white, 0.25)
// //     // },
// //     marginRight: theme.spacing.unit * 2,
// //     marginLeft: 0,
// //     width: "100%",
// //     [theme.breakpoints.up("sm")]: {
// //       marginLeft: theme.spacing.unit * 3,
// //       width: "auto"
// //     }
// //   },
// //   searchIcon: {
// //     width: theme.spacing.unit * 9,
// //     height: "100%",
// //     position: "absolute",
// //     pointerEvents: "none",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     borderColor:'#000',
// //   },
// //   inputRoot: {
// //     color: "inherit",
// //     width: "100%"
// //   },
// //   inputInput: {
// //     paddingTop: theme.spacing.unit,
// //     paddingRight: theme.spacing.unit,
// //     paddingBottom: theme.spacing.unit,
// //     paddingLeft: theme.spacing.unit * 10,
// //     borderColor:'#000',
// //     transition: theme.transitions.create("width"),
// //     width: "100%",
// //     [theme.breakpoints.up("md")]: {
// //       width: 200
// //     }
// //   },
// //   sectionDesktop: {
// //     display: "none",
// //     [theme.breakpoints.up("md")]: {
// //       display: "flex"
// //     }
// //   },
// //   sectionMobile: {
// //     display: "flex",
// //     [theme.breakpoints.up("md")]: {
// //       display: "none"
// //     }
// //   }
// // });



// // class  DashboardPage extends Component {

  

  
// //   render(){
// //     const { classes } = this.props;

    

// //   return (
// //     <div>
      

// //       <Grid style={{backgroundColor:'#FFF',borderBottomStyle:'solid',borderBottomColor:'coral',borderTopStyle:'solid',borderTopColor:'#D8D8D8'}} container spacing={24}>
// //         <Grid item xs={12} sm={6} md={3}>
// //       <Link to='/createevent'>  <Button      
// //         style={{backgroundColor:"rgb(251, 140, 0)",
// //          color:"#FFF",
// //           borderRadius:30, 
// //           width:"100%",
// //           height:60}}>CREATE EVENT
// //       </Button> </Link>
// //         </Grid>
// //          {/* <Grid item xs={12} sm={6} md={3}>
// //           <InfoBox
// //             Icon={ThumbUp}
// //             color={cyan[600]}
// //             title="Likes"
// //             value="4231"
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6} md={3}>
// //           <InfoBox
// //             Icon={Assessment}
// //             color={purple[600]}
// //             title="Sales"
// //             value="460"
// //           />
// //         </Grid> */}
// //         <Grid item xs={12} sm={6} md={3}>
// //         <div className={classes.search}>
// //               <div className={classes.searchIcon}>
// //                 <SearchIcon />
// //               </div>
// //               <InputBase 
// //                 placeholder="Search…"
// //                 classes={{
// //                   root: classes.inputRoot,
// //                   input: classes.inputInput,
// //                   borderRadius:5,
// //                   borderColor:'coral'
// //                 }}
// //               />
// //             </div>
// //         </Grid> 
// //       </Grid>

     

// //       <Grid style={{marginTop:20}} container spacing={24}>
// //         <Grid item xs={12} sm={6}>
// //           <NewOrders data={Data.dashBoardPage.newOrders} />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <MonthlySales data={Data.dashBoardPage.monthlySales} />
// //         </Grid>
// //       </Grid>
// //       <Grid container spacing={24}>
// //         <Grid item xs={12} sm={6}>
// //           <RecentlyProducts data={Data.dashBoardPage.recentProducts} />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <BrowserUsage data={Data.dashBoardPage.browserUsage} />
// //         </Grid>
// //       </Grid>
// //     </div>
// //   );

// // }
// // }


// // export default withStyles(styles)(DashboardPage)




