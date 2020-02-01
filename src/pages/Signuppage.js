import React, {Component} from 'react';
import { Link} from 'react-router-dom'
import jivewhite from '../../src/jive-white.svg'
import axios from 'axios';
import '../images/App.css';

export default class Signuppage  extends Component{


    // Now, let’s initialise the state in the constructor
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            username:'',
            email: '',
            password: '',
            loading:false,

           
            
            
           
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        this.setState({loading:true})
        e.preventDefault();
                    document.getElementById("buttonShipper").innerHTML = "signing you up...";
        // get our form data out of state
        var apiBaseUrl = 'http://198.58.110.127/jive-api/api/v1/users/registration';

        const { first_name, last_name, username, email, password  } = this.state;

        let data = {
            first_name,
            last_name,
            username,
            email,
            password
           
            
           
        }

        console.log(JSON.stringify(data));
        
        
        axios.post(apiBaseUrl, data, {
            data: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Content-Type, Accept, Access-Control-Allow-Origin'
            }
        }).then((response) => {

            //access the response here....
             alert(response);
            console.log(response);
            if(response.data.status === 200){
                console.log(response);
                alert("Registration Complete");
                this.setState({loading:false})
                document.getElementById("buttonShipper").innerHTML = "success";
                
            }
            else if(response.data.status === 400){
                alert(response.data.message);
                document.getElementById("buttonShipper").innerHTML = "failed try again...";
            }
        }).catch(function (error) {
            alert("failed to complete");
            document.getElementById("buttonShipper").innerHTML = "failed try again...";
            console.log('error got' + error);
        });   
    }





  render(){
    const{loading} = this.state
return(
     <section className="signup-page flex-container">
     <div className="container-fluid ">
			<div className="row">
				<div className="col-md-8 hidden-xs hidd" style={{padding: 0,margin: 0}}>
					<div className="signup-bg" >
                    
						<div className="signup-left">
							<img src={jivewhite} alt='' className="signup-img-left"/>
							<p className="signup-info-left">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti </p>
						</div>
					</div>
				</div>
				<div className="col-md-4" style={{padding:0,margin:0}}>
					<div className="signup-form">
						<div className="row" >
							<div className="col-md-12 create">
								
								<h2 className="creat">Create an Account</h2>
							</div>
							
						</div>

						<div className="row">
							 {/* Form Start */}
                    <div className="contact_from">
                        <form onSubmit={this.onSubmit}>
                             {/* Message Input Area Start */}
                            <div className="contact_input_area">
                                <div className="row">
                                     {/* Single Input Area Start */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            name="first_name" 
                                            value ={this.state.first_name}
                                            onChange ={this.onChange}
                                            id="first_name" 
                                            placeholder="First Name" 
                                            required/>
                                        </div>
                                    </div>
                                    
                                    {/* Single Input Area Start */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                        <input 
                                            type="name"
                                            className="form-control" 
                                            name="last_name" 
                                            value={this.state.last_name}
                                            onChange={this.onChange}
                                            id="last_name" 
                                            placeholder="Last Name" required/>
                                        </div>
                                    </div>
                                     {/* Single Input Area Start */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="name"
                                             className="form-control" 
                                             name="username" 
                                             value={this.state.username}
                                             onChange={this.onChange}
                                             placeholder="User Name" 
                                            required/>
                                        </div>
                                    </div>
                                    {/* Single Input Area Start */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="email" 
                                            className="form-control" 
                                            name="email" 
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            placeholder="E-mail" 
                                            required/>
                                        </div>
                                    </div>
                                 
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="password"
                                             className="form-control" 
                                             value={this.state.password}
                                             onChange={this.onChange}
                                             name="password" 
                                            placeholder="Password"
                                             required/>
                                        </div>
                                    </div>
                                    {/* -- Single Input Area Start - */}
                                    <div className="col-12 submt">
                                        <button type="submit"  className="btn submit-btn1" id="buttonShipper" disabled={loading}> SIGNUP
                                        {loading && <i  className="fa fa-spinner fa-spin"></i>} 
                                        </button>
                                    </div>
                                </div>
                            </div>
                         
                        </form>
                        
                    </div>
						</div>
                        <div className="row account">
                            <div className="col-md-10 pull-left logg">Already have an account?</div> 
                            <div className="col-md-2 pull-right loog"> <Link to="/"style={{color:"red"}} className="loggg">Login</Link></div>
                        </div>
					</div>
				</div>
			</div>
		</div>
     

     </section>
    )
  }
  
}