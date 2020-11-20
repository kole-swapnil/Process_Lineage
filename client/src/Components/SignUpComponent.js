import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Input , Button } from 'reactstrap';
import { BrowserRouter, NavLink , Redirect , Link } from 'react-router-dom';
 
import '../App.css'
var x;


class SignUp extends Component{
    constructor(props){
        super(props);
        this.handleSubmitMan = this.handleSubmitMan.bind(this);
        this.handleSubmitCust = this.handleSubmitCust.bind(this);
        this.handleSubmitGovt = this.handleSubmitGovt.bind(this);
    }

    
    async handleSubmitCust(event){
        event.preventDefault();
        this.props.reghandler(4);
    }
    async handleSubmitMan(event){
        event.preventDefault();
         this.props.reghandler(3);
    }
    async handleSubmitGovt(event){
        event.preventDefault();
         if(this.props.accounts == '0xC0EC435ad729B545d645bA3A83C74872D585e282'){
         this.props.reghandler(5);
         console.log(this.props.registered);
         }
    }
    render(){
        return(
            
            <React.Fragment>
                <h1>SignUp Page</h1>
                <div className="container">
                    <div className="row justify-content-center pt-3">             
                        <div className="col-4">
                            <h6 className="m-auto"> Customer SignUp</h6>
                            <div className="part pt-5">
                                <i class="fa fa-user-circle-o fa-4x" aria-hidden="true"></i>
                                <br/><br/>

                                <div className="p-2">
                                    <label> Name </label><br/>
                                    <input type="text" name="fulname" placeholder="Enter name..." style={{ width: "250px"}} required/>
                                </div> 

                                <div className="p-2">
                                    <label> Aadhar Number </label><br/>
                                    <input type="text" name="aadhar" placeholder="Enter Aadhar Number..." style={{ width: "250px"}} required/>
                                </div>

                                <div className="p-2">
                                    <label> Address </label><br/>
                                    <input type="text" name="addr" placeholder="Enter Address..." style={{ width: "250px"}} required/>
                                </div>
                                
                                <button class="btn btn-sm btn-primary text-uppercase pl-3 pr-3" type="submit" onClick={this.handleSubmitCust} ><Link to="/register" style={{textDecoration: 'none' , color: 'white'}}>Sign Up</Link></button>
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 className="m-auto"> Manufacturer SignUp</h6>
                            <div className="part pt-5">
                                <i class="fa fa-users fa-4x" aria-hidden="true"></i>

                                <br/><br/>

                                <div className="p-2">
                                    <label> Name </label><br/>
                                    <input type="text" name="fulname" placeholder="Enter name..." style={{ width: "250px"}} required/>
                                </div> 

                                <div className="p-2">
                                    <label> Aadhar Number </label><br/>
                                    <input type="text" placeholder="Enter Aadhar Number..." style={{ width: "250px"}} required/>
                                </div>

                                <div className="p-2">
                                    <label> Address </label><br/>
                                    <input type="text" placeholder="Enter Address..." style={{ width: "250px"}} required/>
                                </div>
                                
                                <button class="btn btn-sm btn-primary text-uppercase pl-3 pr-3" type="submit" onClick={this.handleSubmitMan}><Link to="/register" style={{textDecoration: 'none' , color: 'white'}}>Sign Up</Link></button>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </React.Fragment>
        )

    }

}

export default SignUp;