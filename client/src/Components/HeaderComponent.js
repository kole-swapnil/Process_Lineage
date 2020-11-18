import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Web3 from "web3";
import '../App.css'
var util;
var util1;

class Header extends Component{
    constructor(props){
        super(props);

        this.state = { isNavOpen : false }
        this.togglenav = this.togglenav.bind(this);

    }

    togglenav(){
        this.setState({isNavOpen : !this.state.isNavOpen});
    }
    conver = async (x) => {

        util =  (Web3.utils.toWei(x, 'milli'));
    }
    converb = async (x) => {
        util1 = (Web3.utils.fromWei(x, 'milli'));
    }
    render(){
        this.converb(this.props.balance.toString());
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container justify-center">
                    
                        <NavbarToggler onClick={this.togglenav}/>
                        <NavbarBrand className="mr-auto" >BrimNet</NavbarBrand>
                        <Collapse isOpen = {this.state.isNavOpen} navbar>
                        
                            <Nav navbar className="m-auto">
                            
                            <NavItem>
                                <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/home">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/items">Items</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/shipment">Shipments</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/register">Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/allmem">All Members</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link pl-5 pr-5" to="/login">Login</NavLink>
                            </NavItem>
                            
                            </Nav>
                            
                        </Collapse>
                    </div>
                    <h6 style={{ color: "white"}}>Balance : {util1}</h6>
                </Navbar>
            
            </React.Fragment>
        )

    }

}

export default Header;