import React, { Component } from 'react';
//import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { render } from 'react-dom';

var vx;
var alldocs = [];
var allcus = [];
var allmanu = [];
function Allpatrender({dish}){
    // var day = moment.unix(dish.dateofComp); 
    // var xy = dish.dateofComp;
    // var date = new Date(xy*1000);
    // var time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // var yz = xy != 0?"bg-success text-white":""; 
    var cl = dish.itemtype == 0? "fa fa-laptop fa-5x" :((dish.itemtype ==1)?"fa fa-mobile fa-5x" :"fa fa-desktop fa-5x" );
    return(
        <Card >
        <i className={cl}></i>
        <CardBody>
        <CardTitle>Item ID : {dish.itemid}</CardTitle>
        <CardText><small>Item Type : {category(parseInt(dish.itemtype))}</small></CardText>
        <CardText><small>Item Price : {dish.price}</small></CardText>
        <CardText><small>GST : {dish.gst}</small></CardText>
        <CardText><small>Model : {dish.model}</small></CardText>
        <CardText><small>Description : {dish.description}</small></CardText>

        <Col md={{size:10, offset:1}}>
            <Button type="submit" color="primary" >
                Buy Item
            </Button>
        </Col>
        </CardBody>
        
      </Card>
      
    )
}

function category(i) {

        switch(i) {
            case 0:
                vx = 'laptop';
                break;
            case 1:
                vx = 'mobile';
                break;
            case 2:
                vx = 'Desktop';
                break;
        }
        return vx;
}

// function calDist(c) {
//     var pin = c.custpincode;
//     var min = 999999;
//     var x; // res
//     var y; // y
//     var add ;
//     for (var i = 1; i <= manu; i++){
//         y = manu[i].manupincode;
//         x = subtract(pin,y);
//         if(min>x){
//             min = x;
//             y = manu[i];
//         }
//     }
//     return y;
// }

// function subtract(a, b){
//     if (a > b){
//         return a-b;
//     }
//     else{
//         return b-a;
//     }
// }

class AllItemComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , cust: [] , manuf: [] }
        //this.com = this.com.bind(this);
    }
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.itemcount().call();
        console.log(res);
        var cus= await this.props.contract?.methods.customercount().call();
            console.log(cus);
        var manu= await this.props.contract?.methods.manufacturercount().call();
            console.log(manu);
               
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.Items(i).call();
                    response.push(rex);
                }
                alldocs = [];
                alldocs = response;
                console.log(response);
                this.setState({ dish : alldocs});

                // // Customers array
                // var customer= [];
                // for(var i=1;i<=cus;i++){
                //     var cuscall = await this.props.contract?.methods.Customers(i).call();
                //     customer.push(cuscall);
                // }
                // allcus = [];
                // allcus = customer;
                // console.log(customer);
                // this.setState({ cust : allcus});

                // // Manufacturer Array
                // var manufacturer= [];
                // for(var i=1;i<=manu;i++){
                //     var manucall = await this.props.contract?.methods.Manufacturer(i).call();
                //     manufacturer.push(manucall);
                // }
                // allmanu = [];
                // allmanu = manufacturer;
                // console.log(manufacturer);
                // this.setState({ manuf : allmanu});
         
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