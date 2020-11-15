import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
 
import '../App.css'

class Header extends Component{
    constructor(props){
        super(props);

        this.state = { isNavOpen : false }
        this.togglenav = this.togglenav.bind(this);
    }

    togglenav(){
        this.setState({isNavOpen : !this.state.isNavOpen});
    }

    render(){
      
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container justify-center">
                    
                        <NavbarToggler onClick={this.togglenav}/>
                        <NavbarBrand className="mr-auto" >BrimNet</NavbarBrand>
                        <Collapse isOpen = {this.state.isNavOpen} navbar>
                        
                            <Nav navbar className="m-auto">
                            
                            <NavItem>
                                <NavLink className="nav-link pl-5 pr-5" to="/home">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link pl-5 pr-5" to="/items">Items</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link pl-5 pr-5" to="/shipment">Shipments</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link pl-5 pr-5" to="/register">Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link pl-5 pr-5" to="/login">Login</NavLink>
                            </NavItem>
                            
                            </Nav>
                            
                        </Collapse>
                    </div>
        
                </Navbar>
            
            </React.Fragment>
        )

    }

}

export default Header;