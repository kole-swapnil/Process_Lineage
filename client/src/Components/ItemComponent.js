import React, { Component } from 'react';
//import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { render } from 'react-dom';
var mst;
var alldocs = [];
function Allpatrender({dish}){
    // var day = moment.unix(dish.dateofComp); 
    // var xy = dish.dateofComp;
    // var date = new Date(xy*1000);
    // var time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // var yz = xy != 0?"bg-success text-white":""; 
    return(
        <Card >
        <i className="fa fa-laptop fa-5x"></i>
        <CardBody>
        <CardTitle>Item ID : {dish.itemid}</CardTitle>
        <CardText><small>Item Type : {dish.itemtype}</small></CardText>
        <CardText><small>Item Price : {dish.price}</small></CardText>
        <CardText><small>GST : {dish.gst}</small></CardText>
        <CardText><small>Model : {dish.model}</small></CardText>
        <CardText><small>Description : {dish.description}</small></CardText>
        
        </CardBody>
      </Card>
    )
    }

class AllItemComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] }
        //this.com = this.com.bind(this);
    }
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.itemcount().call();
               
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.Items(i).call();
                    response.push(rex);
                }
                alldocs = [];
                alldocs = response;
                console.log(response);
                this.setState({ dish : alldocs});
         
    }

     render(){
  
        const Menu = this.state.dish.map((x) => {
            return (
                <div key={x} className="col-4 col-md-3">
                    < Allpatrender dish={x}/>
                </div>
            );
        })
    
        return(
        <div className="container">
            <h2>All Items</h2>
            <br/>
            <br/>
            <div className="row">
                {Menu}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        
        )
    }


}




export default AllItemComponent;