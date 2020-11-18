import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { render } from 'react-dom';
var mst;
var alldocs = [];
var allcusts = [];
function Allmanrender({dish}){
    var yz = "bg-success text-white"; 
    return(
        <Card className={yz}>
        <i className="fa fa-users fa-4x"></i>
        <CardBody>
        <CardTitle>Manufacturer Name : {dish.manuname}</CardTitle>
        <CardText><small>Account : {dish.manuadd}</small></CardText>
          <CardText>
            <small>Pincode : {dish.manupincode}</small>
          </CardText>
        </CardBody>
      </Card>
    )
    }
    function Allcustrender({custs}){
        var yz = "bg-primary text-white"; 
        return(
            <Card className={yz}>
            <i className="fa fa-user fa-4x"></i>
            <CardBody>
            <CardTitle>Customer Name : {custs.custname}</CardTitle>
            <CardText><small>Account : {custs.custadd}</small></CardText>
              <CardText>
                <small>Pincode : {custs.custpincode}</small>
              </CardText>
            </CardBody>
          </Card>
        )
        }

class AllMemComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [], custs: [] }
        //this.com = this.com.bind(this);
    }
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.manufacturercount().call();
               
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.Manu_ids(i).call();
                    response.push(rex);
                }
             
                alldocs = [];
                for(var j=0;j<response.length;j++){
                    var xt = await this.props.contract.methods.Manufacturers(response[j]).call();
                    alldocs.push(xt);
                 
                }
                console.log(alldocs);
                this.setState({ dish : alldocs});

                var res2 = await this.props.contract?.methods.customercount().call();
               
                var response2= [];
                for(var i=1;i<=res2;i++){
                    var rex = await this.props.contract?.methods.cust_ids(i).call();
                    response2.push(rex);
                }
            
                allcusts = [];
                for(var j=0;j<response2.length;j++){
                    var xt1 = await this.props.contract.methods.Customers(response2[j]).call();
                    allcusts.push(xt1);
                    console.log(j);
                }
                console.log(allcusts);
                this.setState({ custs : allcusts});
         
    }

     render(){
         var z = this.props.accounts;
        
        const Menu = this.state.dish.map((x) => {
            return (
                <div key={x.manuid} className="col-4 col-md-3">
                    < Allmanrender dish={x}/>
                </div>
            );
        })
        const Cu = this.state.custs.map((y) => {
            return (
                <div key={y.custid} className="col-4 col-md-3">
                    < Allcustrender custs={y}/>
                </div>
            );
        })
        return(
        <div className="container">
            <h2>All Members</h2>
            <div className="row">
                {Menu}
            </div>
            <br/>
            <br/>
            <div className="row">
                {Cu}
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




export default AllMemComponent;