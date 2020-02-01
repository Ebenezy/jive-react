import React, { Component } from 'react';
import {Card, CardBody, CardHeader,
  
  Col, 
  Table,  
  Modal,
  ModalBody, 
   
  ModalHeader, 
  Row } from 'reactstrap';
import Button from '@material-ui/core/Button';
import '../images/_misc.css'


import Library from '../library/Library';
import axios from 'axios';
import LinkRow from '../components/LinkRow';
import Spinner from "../components/spinner";

// import Loader from 'react-loader-spinner'


class LinkList extends Component {
  

  constructor(props){
    super(props)
    console.log(props)
    this.state={
      items:[],
      isLoading: true,
      error:null,
      modal: false,
      redirectToReferrer:false,
      token:'',
      event_id:this.props.match.params.uuid,
      name:'',
      message:'',
      max_usage:'',
    }
    this.toggle = this.toggle.bind(this);



  }
 
  

  // Network call for link list
componentDidMount(){ 
    if(Library.getData('oauth-token'))
    {
    
    axios.get('http://198.58.110.127/jive-api/api/v1/links/list/'+this.props.match.params.uuid, { headers: {"Authorization" :Library.getData("oauth-token")} })
    .then(res => {
        console.log(res);

    this.setState({
        items: res.data.data,
        isLoading: false,
        redirectToReferrer: false
    })
    }).catch(error => this.setState({
       error,
       loading: false 
      
      }));

  }

}

onChange = (e) => {
  // Because we named the inputs to match their corresponding values in state, it's
  // super easy to update the state
  const state = this.state
  state[e.target.name] = e.target.value;
  this.setState(state);
}

onSubmit = (e) => {
  e.preventDefault();
              document.getElementById("buttonShipper").innerHTML = "creating link...";
  // get our form data out of state
  var apiBaseUrl = 'http://198.58.110.127/jive-api/api/v1/links/create';

  const {name,  message, max_usage } = this.state;

  let data = {
      event_id:this.props.match.params.uuid,
      name,
      message,
      max_usage,
      loading:true
      
     
      
     
  }

  console.log(JSON.stringify(data));
  
  
  axios.post(apiBaseUrl, data, {
      data: JSON.stringify(data),
      headers: {
          'Authorization': Library.getData('oauth-token')
      }
  }).then((response) => {

      //access the response here....
      console.log(response);
      if(response.data.status === 200){
          console.log(response);
          document.getElementById("buttonShipper").innerHTML = "success";
          
      }
      else if(response.data.status === 400){
          document.getElementById("buttonShipper").innerHTML = "failed try again...";
      }
  }).catch(function (error) {
      alert("failed to complete");
      document.getElementById("buttonShipper").innerHTML = "failed try again...";
      console.log('error got' + error);
  });   
}



LinkRow(){
  return this.state.items.map(function(object, i){
      return <LinkRow obj={object} key={i} />;
  });
}

toggle() {
  this.setState({
    modal: !this.state.modal,
  });
}


  render() {
    const { isLoading } = this.state;

    return (
      <div className="animated fadeIn">
       <Row>
          <Col>
            <Card>
              
              <CardBody>
                <Button  className="btn btn-gradient-primary mr-2" onClick={this.toggle} style={{height:50, color:'#FFF'}}>Generate New Links</Button>
                <Modal style={{marginTop:"5%", color:'#FFF'}} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader className="btn btn-gradient-primary mr-2"  toggle={this.toggle}>Create Custom Link</ModalHeader>
                  <ModalBody>
                 
                  <form className="forms-sample">
                    
                    <div className="form-group row">
                      <label for="exampleInputEmail2"
                       className="col-sm-3 col-form-label">Email</label>
                      <div className="col-sm-9">
                        <input type="text" 
                        className="form-control"
                        name="name"
                        onChange={this.onChange}
                        id="exampleInputEmail2" 
                         placeholder="House of David"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="exampleInputMobile"
                       className="col-sm-3 col-form-label">Mobile</label>
                      <div className="col-sm-9">
                        <textarea type="textarea" 
                        className="form-control" 
                        id="exampleInputMobile" 
                        name="message"
                        onChange={this.onChange}
                        placeholder="Description...."/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="exampleInputPassword2" class="col-sm-3 col-form-label">Password</label>
                      <div className="col-sm-9">
                        <input type="text" 
                        className="form-control"
                         id="exampleInputPassword2"
                         name="max_usage"
                         onChange={this.onChange}
                          placeholder="Maximun Usage eg 10"/>
                      </div>
                    </div>
                    
                    <button style={{color:"#FFF",height:50, fontSize:"16px", width:100}} type="submit" id="buttonShipper"className="btn btn-gradient-primary mr-2" onClick={this.onSubmit}>Submit</button>
                    <button style={{height:50, width:100}} className="btn btn-light" onClick={this.toggle}>Cancel</button>
                  </form>
               </ModalBody>
                </Modal>
                </CardBody>
            </Card>
          </Col>
        </Row>  
        <br/>
     
        <Row>
            <Col>
              <Card>
                <CardHeader   style={{ color:"#FFF",textAlign:'left', fontSize:20}}>
                  <i  className="fa fa-align-justify"></i>
                </CardHeader>
                <CardBody>
                {!isLoading ? (
                   <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>
                      <th  style={{fontFamily:'Ubuntu'}}>Code</th>
                      <th  style={{fontFamily:'Ubuntu'}}>Invites Status</th>
                      <th  style={{fontFamily:'Ubuntu'}}>Clicks</th>
                      <th   style={{fontFamily:'Ubuntu'}}>Max Usage</th>
                      <th   style={{fontFamily:'Ubuntu'}}>Created</th>
                     
  
  
                    </tr>
                    </thead>
                    
                    
                    <tbody>{this.LinkRow()}
      
                    </tbody> 
                    
                  </Table>
                  ) : (
                    <div>
                    <Spinner />
                    <p style={{textAlign:'center', fontFamily:'Ubuntu', fontSize:'15'}}>Please wait...</p>
                    </div>
                  )}
                  <br/>
                  <nav>
                  
                  </nav>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>

    );
  }
}

export default LinkList;



