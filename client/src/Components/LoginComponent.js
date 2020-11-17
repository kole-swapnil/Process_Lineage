import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
 
import '../App.css'

class Login extends Component{
    constructor(props){
        super(props);
        this.handleSubmitMan = this.handleSubmitMan.bind(this);
        this.handleSubmitCust = this.handleSubmitCust.bind(this);
        this.handleSubmitGovt = this.handleSubmitGovt.bind(this);
    }

    async handleSubmitMan(event){
       event.preventDefault();
        this.props.reghandler(3);
        
    }
    async handleSubmitCust(event){
        event.preventDefault();
        this.props.reghandler(4);
        
    }
    async handleSubmitGovt(event){
        event.preventDefault();
        this.props.reghandler(5);
        
    }
    render(){
      
        return(
            <React.Fragment>
                <h1>Login Page</h1>
                <div className="container">
                    <div className="row justify-content-center pt-3">             
                        <div className="col-4">
                            <h6 className="pl-5"> User SignIn</h6>
                            <div className="part pt-5">
                                <i class="fa fa-user-circle-o fa-4x" aria-hidden="true"></i>
                                <br/><br/>

                                <div className="p-2">
                                    <label> Name </label><br/>
                                    <input type="text" placeholder="Enter name..." style={{ width: "250px"}}/>
                                </div> 

                                <div className="p-2">
                                    <label> Aadhar Number </label><br/>
                                    <input type="text" placeholder="Enter Aadhar Number..." style={{ width: "250px"}}/>
                                </div>

                                <div className="p-2">
                                    <label> Address </label><br/>
                                    <input type="text" placeholder="Enter Address..." style={{ width: "250px"}}/>
                                </div>
                                
                                <button class="btn btn-sm btn-primary text-uppercase pl-3 pr-3" type="submit" onClick={this.handleSubmitMan} >Sign in</button>
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 className="pl-5"> Manufacturer SignIn</h6>
                            <div className="part pt-5">
                                <i class="fa fa-users fa-4x" aria-hidden="true"></i>

                                <br/><br/>

                                <div className="p-2">
                                    <label> Name </label><br/>
                                    <input type="text" placeholder="Enter name..." style={{ width: "250px"}}/>
                                </div> 

                                <div className="p-2">
                                    <label> Aadhar Number </label><br/>
                                    <input type="text" placeholder="Enter Aadhar Number..." style={{ width: "250px"}}/>
                                </div>

                                <div className="p-2">
                                    <label> Address </label><br/>
                                    <input type="text" placeholder="Enter Address..." style={{ width: "250px"}}/>
                                </div>
                                
                                <button class="btn btn-sm btn-primary text-uppercase pl-3 pr-3" type="submit" onClick={this.handleSubmitCust}>Sign in</button>
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 className="pl-5"> Goverment SignIn</h6>
                            <div className="part pt-5">
                                <i class="fa fa-id-card fa-4x" aria-hidden="true"></i>
                                <br/><br/>

                                <div className="p-2">
                                    <label> Name </label><br/>
                                    <input type="text" placeholder="Enter name..." style={{ width: "250px"}}/>
                                </div> 

                                <div className="p-2">
                                    <label> Aadhar Number </label><br/>
                                    <input type="text" placeholder="Enter Aadhar Number..." style={{ width: "250px"}}/>
                                </div> 

                                <div className="p-2">
                                    <label> Address </label><br/>
                                    <input type="text" placeholder="Enter Address..." style={{ width: "250px"}}/>
                                </div>
                                
                                <button class="btn btn-sm btn-primary text-uppercase pl-3 pr-3" type="submit">Sign in</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </React.Fragment>
        )

    }

}

export default Login;