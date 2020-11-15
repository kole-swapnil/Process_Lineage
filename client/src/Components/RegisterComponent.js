import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
 
import '../App.css'

var reg;
var ele;
class RegisterComp extends Component{
    constructor(props){
        super(props);
        
    }

    func(){
    reg = this.props.registered;
    console.log(reg);
    ele = reg == 0?"Register":"Update";
    }

    render(){
        this.func();
        return(
            <React.Fragment>
                <div classname="container">

                <h1>{ele}</h1>

                </div>
            
            </React.Fragment>
        )

    }

}

export default RegisterComp;