import React, { Component,  } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Library from '../../library/Library'
import '../../images/_misc.css'




class EventListRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
}
delete() {
  let url = 'http://198.58.110.127/jive-api/api/v1/events/'+this.props.obj.uuid+'/delete'
    axios.get( url, { headers: {"Authorization" :Library.getData("oauth-token")} })
        .then(alert('Deleted'))
        .catch(err => console.log(err))
}
  render() {
    return (
   
    <tr>
   
    <td><img alt=""style={{width:50, height:50, objectFit:'cover', marginLeft:5, borderRadius:"50%"}} src={this.props.obj.logo_url}/></td>
    <td>{this.props.obj.name}</td>
    <td>{this.props.obj.start_date}</td>
    <td>{this.props.obj.end_date}</td>
    <td>
    <Link to={{pathname:"/event-update/"+this.props.obj.uuid}}><Button style={{marginRight:"5px",fontFamily:"Ubuntu"}} class="btn btn-primary btn-fw">
    Edit
    </Button></Link>
    <Button  onClick={this.delete} style={{marginRight:"5px",fontFamily:"Ubuntu"}} class="btn btn-danger btn-fw">  Delete </Button>
    <Link to={{pathname:"/invite/"+this.props.obj.uuid}}><Button style={{marginRight:"5px", fontFamily:"Ubuntu",padding:'10px,10px,10px,10px'}} class="btn btn-info btn-fw">
   Invite
    </Button></Link>


    </td>
   

                    
    </tr>
    
    

    );
  }
}

export default EventListRow;