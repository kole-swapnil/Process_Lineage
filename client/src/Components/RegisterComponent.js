import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
 
import '../App.css'

var reg;
var ele;
class RegisterComp extends Component{
    constructor(props){
        super(props);
        this.state={name : '', age : 0, speciality : ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
    }
    
    async handleSubmit(event){
        console.log("Current State" + JSON.stringify(this.state));
        event.preventDefault();
        
    }

    func(){
    reg = this.props.registered;
    console.log(reg);
    switch(reg) {
        case 3:
            ele = 'Register Manufacturer';
            break;
        case 1:
            ele = 'Update Manufacturer';
            break;
        case 4:
            ele = 'Register Customer';
            break;
        case 2:
            ele = 'Update Customer';
            break;
        default : 
            ele = "Register";
    }
    
    }

    render(){
        this.func();
        return(
            <React.Fragment>
                <div classname="container">

                <h1>{ele}</h1>

                </div>
                <div className="container">
                
            <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="name" md={2}>Manufacturer Name</Label>
                            <Col md={10}>
                                <Input type="text" id="name" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="pincode" md={2}>Pincode</Label>
                            <Col md={10}>
                                <Input type="tel" id="pincode" name="pincode" placeholder="Pincode" value={this.state.pincode} onChange={this.handleInputChange} />    
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size:10, offset:2}}>
                                <Button type="submit" color="primary" >
                                    {ele}
                                </Button>
                            </Col>
                            
                        </FormGroup>
                    </Form>
                 
            </div>
   
            
            </React.Fragment>
        )
    
    }

}

export default RegisterComp;



