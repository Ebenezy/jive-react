import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
import Library from '../library/Library'
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Datetime from 'react-datetime';
import LoadingOverlay from 'react-loading-overlay';












class Forms extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      name : '' ,
      description : '',
      start_date:moment().format('MM/DD/YYYY hh:ma'),
      end_date:moment().format('MM/DD/YYYY hh:ma'),
      logo:'',
      max_usage:'',
      redirectToReferrer:false,
      token:'',
      active:null,
      loading:  false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  fileChangedHandler = event => {
    this.setState({ logo: event.target.files[0] });
  }
  handleonChange = (start_date) => {
    this.setState({
      start_date
    });
  }
  onChange = (end_date) => {
    this.setState({
      end_date
    });
  }


  handleChange(event){
    this.setState({
        [event.target.name] : event.target.value
        
  });
  }

  handleSubmit =()=>{
    document.getElementById("buttonShipper").innerHTML = "Creating Event...";
    this.setState({loading:true})

const user = {
    name : this.state.name,
    description : this.state.description,
    start_date:this.state.start_date,
    end_date:this.state.end_date,
    logo:this.state.logo,
    max_usage:this.state.max_usage
     };
    console.log(user);


    let  bodyFormData = new FormData();
    bodyFormData.set('name', user.name);
    bodyFormData.set('description',user.description);
    bodyFormData.set('start_date', user.start_date);
    bodyFormData.set('end_date', user.end_date);
    bodyFormData.append('logo',this.state.logo,
      this.state.logo.name)
    bodyFormData.set('max_usage', user.max_usage);
    axios({
      method: 'POST',
      url: 'http://198.58.110.127/jive-api/api/v1/events/create',
      data: bodyFormData,
      headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization': Library.getData('oauth-token')
        
        }
      })
      .then(function (response) {
          //handle success
          // console.log(response);
          // alert(response)
          
          document.getElementById("buttonShipper").innerHTML = "Event Created successfull";
            this.loading = false

      })
      .catch(function (response) {
      if(response.status && response.status.message){
        alert(response.message)
      }

        document.getElementById("buttonShipper").innerHTML = "failed try again...";

          //handle error
          console.log(response.message);
      });
 }


  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {

    return (
      <div className="animated fadeIn">

      <div class="page-header">
      <h3 class="page-title">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
          <i class="fa fa-list"></i>                 
        </span>
       Create Event 
      </h3>
      </div>

      
        
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong style={{fontSize:"16px"}} class="btn btn-light">Create Event</strong>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Name of Event</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input style={{fontFamily:'Ubuntu', fontSize:16}}    type="text" id="text-input" name="name" onChange={this.handleChange} placeholder="House Party" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label    htmlFor="text-input">Maximum Usage</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input  style={{fontFamily:'Ubuntu', fontSize:16}}   type="text" id="text-input" name="max_usage" onChange={this.handleChange} placeholder="Limit eg 10" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label  htmlFor="date-input"> Start Date</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Datetime  
                    onChange={this.handleonChange}
                    value={this.state.start_date}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input"> End  Date</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Datetime style={{fontFamily:'Ubuntu', fontSize:16}}
                    onChange={this.onChange}
                    value={this.state.end_date}/>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label  htmlFor="textarea-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input  style={{fontFamily:'Ubuntu', fontSize:16}} type="textarea" name="description" onChange={this.handleChange} id="description" rows="9"
                             placeholder="Description..." />
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label  htmlFor="file-input">Upload Image</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input class="file-upload-default" style={{fontFamily:'Ubuntu', fontSize:16}}  type="file" accept="image/*" name="logo"  onChange={this.fileChangedHandler}  />
                    </Col>
                  </FormGroup>
                 
                  
                </Form>
              </CardBody>
              <CardFooter>
              

                <Button   class="btn btn-gradient-primary mr-2" style={{fontFamily:'Ubuntu', fontSize:"16px", color:'#FFF', height:50, width:150}} type="submit" id="buttonShipper" onClick={this.handleSubmit} size="sm"><i style={{marginRight:"7px"}}class="fa fa-dot-circle-o"></i>Save</Button>

                {this.state.loading && <LoadingOverlay/>}
                
                
              </CardFooter>
            </Card>
          
          </Col>
        </Row>
        
         
      </div>
    );
  }
}

export default Forms;
