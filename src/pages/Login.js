import React, {Component} from "react";
import jivewhite from '../../src/jive-white.svg';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom'
import Library from '../library/Library';






export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
           login:'' ,
           loading:false,
           password: '',
           redirectToReferrer : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value,
            
            
        });
}
            handleSubmit(event){
                    event.preventDefault();
                    document.getElementById("buttonShipper").innerHTML = "signing you in...";
                    this.setState({ loading:true })

                    const user = {
                    login :this.state.login,
                    password :this.state.password
                    };
                    
            if(this.state.login && this.state.password)      
                {
            axios.post('http://198.58.110.127/jive-api/api/v1/users/login',user)
            .then((response) =>
                { 
                    let userresponse = response;
                    console.log(userresponse.data);
                    let token = response.data.data.token;
                    if(userresponse){
                        // alert(userresponse.data.data.token)
                        Library.setData('oauth-token', token);
                        document.getElementById("buttonShipper").innerHTML = "success";
                        // sessionStorage.setItem('data',JSON.stringify(userresponse.data.data.token));
                    this.setState({redirectToReferrer: true, loading:false});
                    alert(userresponse.data.data.token)
                    }else{
                        document.getElementById("buttonShipper").innerHTML = "failed try again...";

                    }
                    
                },this)
                .catch(function (error) {
                    document.getElementById("buttonShipper").innerHTML = "failed try again...";
                    console.log('error got' + error);
                });   
                        
            }
        }



    render(){
        const{loading} = this.state
        if (this.state.redirectToReferrer){
            
            
            return (<Redirect to={'/dashboard'}/>)
        }
            if (Library.getData('oauth-token')) {
            
                return (<Redirect to={'/dashboard'}/>)
        }

        return(
    <section className="signup-page flex-container">
		<div className="container-fluid ">
			<div className="row">
                <div className="col-md-4" style={{padding: 0, margin: 0}}>
                    <div className="signup-form">
                        <div className="row" >
                            <div className="col-md-12 create">
                                <h2 className="creat">Login</h2>
                            </div>
                            
                        </div>

                        <div className="row">
                            {/* Form Start */}
                    <div className="contact_from">
                        <form  ref="formdemo" onSubmit={this.handleSubmit} >
                         
                            <div className="contact_input_area">
                                <div className="row">
                                    
                                    
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="name"
                                             className="form-control" 
                                             name="login" 
                                             placeholder="Username" 
                                             onChange={this.handleChange}
                                             required/>
                                        </div>
                                    </div>
                                    
                                     
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="password"
                                            className="form-control"
                                            name="password" 
                                            onChange={this.handleChange}
                                            placeholder="Password" 
                                            required/>
                                        </div>
                                    </div>
                                     
                                    <div className="col-12 submt">
                                        <button  type="submit" id="buttonShipper" disabled={loading} className="btn submit-btn1"><i className=""></i> LOGIN
                                        {loading && <i className="fa fa-spinner fa-spin"></i>} 
                                        </button>
                                    </div>
                                </div>
                            </div>
                               
                        </form>
                        
                    </div>
                        </div>
                        <div className="row account">
                            <div className="col-md-9 pull-left logg">Don't have an account?</div> 
                            <div className="col-md-3 pull-right loog"> <Link to="/signup" style={{color:"red"}} className="loggg ">Signup </Link></div>
                        </div>
                    </div>
                </div>

				<div className="col-md-8 hidden-md hidden-sm hidden-xm" style={{padding:0,margin: 0}}>
					<div className="signup-bg">
						<div className="signup-left">
							<img src={jivewhite} alt="" className="signup-img-left"/>
							<p className="signup-info-left">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti </p>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</section>



        )
    }
}