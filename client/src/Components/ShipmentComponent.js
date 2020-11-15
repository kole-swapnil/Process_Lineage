import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
 
import '../App.css'

class Shipment extends Component{
    constructor(props){
        super(props);
    }

   
    render(){
      
        return(
            <React.Fragment>
                <div class="container">

                    <h1>Shipments</h1>
                </div>
            
            </React.Fragment>
        )

    }

}

export default Shipment;