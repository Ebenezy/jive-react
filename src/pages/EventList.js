// @flow
import * as React from 'react';
import EventListRow from '../components/dashbord/EventListRow';
import {  Card, CardBody, CardHeader, Col, Row, Table,Pagination, PaginationItem, PaginationLink, } from 'reactstrap';
import Library from '../library/Library';
import axios from 'axios';
// import Spinner from "../components/spinner";






class EventList extends React.PureComponent {

    constructor(props){
    super(props)
    this.state={
      items:[],
      isLoading: true,
      error:null,
      redirectToReferrer:false,
      token:'',
    }
  }

    componentDidMount(){ 
    if(Library.getData('oauth-token'))
    {
    // let user = JSON.parse(sessionStorage.getItem('data'));
    // console.log(user);
    // const token = user;
    // console.log(token);
    axios.get("http://198.58.110.127/jive-api/api/v1/events/list", { headers: {"Authorization" :Library.getData("oauth-token")} })
    .then(res => {
        console.log(res);
        Library.setData('event',JSON.stringify(res.data.data))

    this.setState({
        items: res.data.data,
        isLoading: false,
        redirectToReferrer: false
    })
    }).catch(error => this.setState({
       error,
       isLoading: false 
      
      }));

}
  }
tabRow(){
  return this.state.items.map(function(object, i){
      return <EventListRow obj={object} key={i} />;
  });
}


  render() {
    const { isLoading } = this.state;

       return (
      <div>
      <div>
      <div class="page-header">
      <h3 class="page-title">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
          <i class="fa fa-list"></i>                 
        </span>
        Event List
      </h3>
      </div>
      </div>

      <Row>
            <Col>
              <Card>
                <CardHeader   style={{ color:"#FFF",textAlign:'left', fontSize:20}}>
                  <i className="fa fa-align-justify"></i>
                </CardHeader>
                <CardBody>
                {!isLoading ? (

                   <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>
                      <th style={{fontSize:"20px" ,fontFamily:"Ubuntu"}} >Logo</th>
                      <th style={{fontSize:"20px" ,fontFamily:"Ubuntu"}}>Event</th>
                      <th style={{fontSize:"20px" ,fontFamily:"Ubuntu"}} >Start Date</th>
                      <th style={{fontSize:"20px" ,fontFamily:"Ubuntu"}} >End Date</th>
                      <th style={{fontSize:"20px" ,fontFamily:"Ubuntu"}} >Action</th>
                      </tr>
                    
                    </thead>
                    
                    
                    <tbody>{this.tabRow()}</tbody>


                    
                  </Table>
                  ) : (
                    <div>
                    <Spinner />
                    <p style={{textAlign:'center', fontFamily:'Ubuntu', fontSize:'15'}}>Please wait...</p>
                    </div>
                  )}
                 
                  
                  <br/>
                  <nav>
                    <Pagination>
                      <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                      <PaginationItem active>
                        <PaginationLink tag="button">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                    </Pagination>
                  </nav>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
          </div>

    );
  }
}

export default EventList;




