import React, { Component } from 'react';



class LinkRow extends Component {

render() {
    return (
   
    <tr>
    <td   style={{fontFamily:'Montserrat'}}>
    <a href={"https://jive.ng/invite/"+this.props.obj.friendly_url} target="_blank">
    {"https://jive.ng/invite/"+this.props.obj.friendly_url}
    </a>
    </td> 
    <td   style={{fontFamily:'Montserrat'}}>{this.props.obj.name}</td>
    <td   style={{fontFamily:'Montserrat'}}>{this.props.obj.visit_count}</td>
    <td   style={{fontFamily:'Montserrat'}}>{this.props.obj.max_usage}</td>
    <td   style={{fontFamily:'Montserrat'}}>{this.props.obj.created_at}</td>
   </tr>
    

    );
  }
}

export default LinkRow;
