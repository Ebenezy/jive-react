import React, {Component} from "react";

export default class Walletdashboard extends Component{


    render(){

        if(this.props.obj.type === "Credit"){
            return (
                <tr>
                <td>
                {this.props.obj.reference}        
                </td>
                <td>
                {this.props.obj.description}
                </td>
                <td>
                <label class='badge badge-gradient-success'>{this.props.obj.type}</label>
                </td>
                <td>
                {this.props.obj.unit_worth}
                </td>
                <td>
                 {this.props.obj.amount_paid}
                </td>
                
                </tr>
            )
            
        }else if(this.props.obj.type === "Debit"){
            return (
                <tr>
                <td>
                {this.props.obj.reference}        
                </td>
                <td>
                {this.props.obj.description}
                </td>
                <td>
                <label class='badge badge-gradient-danger'>{this.props.obj.type}</label>
                </td>
                <td>
                {this.props.obj.unit_worth}
                </td>
                <td>
                 {this.props.obj.amount_paid}
                </td>
                
                </tr>
            )
        }else{
            return (
            <tr>
                <td>
                {this.props.obj.reference}        
                </td>
                <td>
                {this.props.obj.description}
                </td>
                <td>
                <label class='badge badge-gradient-amber'>{this.props.obj.type}</label>
                </td>
                <td>
                {this.props.obj.unit_worth}
                </td>
                <td>
                 {this.props.obj.amount_paid}
                </td>
                
                </tr>
            )
        };


    }
}