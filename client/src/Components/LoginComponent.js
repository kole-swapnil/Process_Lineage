import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
 
import '../App.css'

class Login extends Component{
    constructor(props){
        super(props);
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
                                    <input type="text" placeholder="Enter name..."/>
                                </div> 

                                <div className="p-2">
                                    <label> Aadhar Number </label><br/>
                                    <input type="text" placeholder="Enter Aadhar Number..."/>
                                </div>

                                <div className="p-2">
                                    <label> Address </label><br/>
                                    <input type="text" placeholder="Enter Address..."/>
                                </div>
                                
                                <button class="btn btn-sm btn-primary text-uppercase pl-3 pr-3" type="submit">Sign in</button>
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 className="pl-5"> Manufacturer SignIn</h6>
                            <div className="part pt-5">
                                <i class="fa fa-users fa-4x" aria-hidden="true"></i>

                                <br/><br/>

                                <div className="p-2">
                                    <label> Name </label><br/>
                                    <input type="text" placeholder="Enter name..."/>
                                </div> 

                                <div className="p-2">
                                    <label> Aadhar Number </label><br/>
                                    <input type="text" placeholder="Enter Aadhar Number..."/>
                                </div>

                                <div className="p-2">
                                    <label> Address </label><br/>
                                    <input type="text" placeholder="Enter Address..."/>
                                </div>
                                
                                <button class="btn btn-sm btn-primary text-uppercase pl-3 pr-3" type="submit">Sign in</button>
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 className="pl-5"> Goverment Official SignIn</h6>
                            <div className="part pt-5">
                                <i class="fa fa-id-card fa-4x" aria-hidden="true"></i>
                                <br/><br/>

                                <div className="p-2">
                                    <label> Name </label><br/>
                                    <input type="text" placeholder="Enter name..."/>
                                </div> 

                                <div className="p-2">
                                    <label> Aadhar Number </label><br/>
                                    <input type="text" placeholder="Enter Aadhar Number..."/>
                                </div> 

                                <div className="p-2">
                                    <label> Address </label><br/>
                                    <input type="text" placeholder="Enter Address..."/>
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