import React, { Component } from 'react';
//import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,
    Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText , Modal, ModalHeader, ModalBody} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Web3 from "web3";
import { render } from 'react-dom';
var util;
var util1;
var vx;
var alldocs = [];
var allcus = [];
var allmanu = [];
var customer;

let conver =  (x) => {

    util =  (Web3.utils.toWei(x, 'milli'));
    return util;
}
let converb =(x) => {
    util1 = (Web3.utils.fromWei(x, 'milli'));
    return util1;
}

let buyitem = async(typeitem) => {
    var res = await this.props.contract?.methods.itemcount().call();
    var response2;
    var response3;
    var rex2;
    for(var i=1;i<=res;i++){
        var rex = await this.props.contract?.methods.Items(i).call();
        if(rex.itemtype == typeitem){
        response2.push(rex);
        }
    }
    console.log(response2);
    for(var j = 0;j<response2.length;j++){
        rex2 = await this.props.contract?.methods.Manufacturers(response2[i].manadr).call();
    }
    var nearadd = calDist(customer,rex2);
    var finalid;
    for(var k = 0; k<response2.length;k++){
        if(nearadd == response2.manadr){
            finalid = response2.itemid;
        }
    }
}

// Create Item



function Allpatrender({dish}){
    // var day = moment.unix(dish.dateofComp); 
    // var xy = dish.dateofComp;
    // var date = new Date(xy*1000);
    // var time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // var yz = xy != 0?"bg-success text-white":""; 
    converb(dish.price.toString());
    var cl = dish.itemtype == 0? "fa fa-laptop fa-5x" :((dish.itemtype ==1)?"fa fa-mobile fa-5x" :"fa fa-desktop fa-5x" );
    return(
        <Card >
        <i className={cl}></i>
        <CardBody>
        <CardTitle>Item ID : {dish.itemid}</CardTitle>
        <CardText><small>Item Type : {category(parseInt(dish.itemtype))}</small></CardText>
        <CardText><small>Item Price : {util1}</small></CardText>
        <CardText><small>GST : {dish.gst}</small></CardText>
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
                vx = 'Laptop';
                break;
            case 1:
                vx = 'Mobile';
                break;
            case 2:
                vx = 'Desktop';
                break;
        }
        return vx;
}

function calDist(c,manu) {
    var pin = c.custpincode;
    var min = 999999;
    var x; // res
    var y; // y
    var add ;
    for (var i = 0; i < manu.length; i++){
        y = manu[i].manupincode;
        x = subtract(pin,y);
        if(min>x){
            min = x;
            y = manu[i];
        }
    }
    return y;
}

function subtract(a, b){
    if (a > b){
        return a-b;
    }
    else{
        return b-a;
    }
}
var itemtype;
var itemprice;
var itemgst;
var itemdesc;


class AllItemComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , cust: [] , manuf: [] , isModalOpen: false }
        this.toggleModal = this.toggleModal.bind(this);
        //this.com = this.com.bind(this);
    }
 
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    createItem = async(itemtype,itemdesc,itemprice,itemgst) => {
        const res = await this.props.contract.methods.createItems(itemtype,itemdesc,itemprice,itemgst).send({from: this.props.accounts,gas : 1000000});
        console.log(res);
    }
    creatingItems = () => {
        itemtype = this.type.value;
        itemprice = (conver(this.price.value));
        
        itemgst = this.gst.value;
        itemdesc = this.desc.value;
        console.log(itemtype);
        this.createItem(itemtype,itemdesc,itemprice,itemgst);
        this.toggleModal();
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

                
                customer = await this.props.contract?.methods.Customers(this.props.accounts).call();
              
         
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
            <Button color="success" onClick={this.toggleModal}>
                Add Item
            </Button>
            
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="modal-xl">
                <ModalHeader toggle={this.toggleModal}>
                    <h3>Add Item</h3>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="row pl-5 pr-5">
                            <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="type" className="ml-3">Item Type</Label>
                                    <Input type="select" id="type" name="type" innerRef={(input) => this.type = input}>
                                        <option>Select Item Type</option>
                                        <option>{}</option>
                                        <option>Labtop</option>
                                        <option>Desktop</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="price" className="ml-3">Item Price</Label>
                                    <Input type="text" id="price" name="price"
                                        innerRef={(input) => this.price = input}  />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row pl-5 pr-5">
                            
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="gst" className="ml-3">Item GST</Label>
                                    <Input type="text" id="gst" name="gst"
                                        innerRef={(input) => this.gst = input}  />
                                </FormGroup>    
                            </div>
                        </div>
                        
                        <div className="row pl-5 pr-5">
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="desc" className="ml-3">Item Description</Label>
                                    <Input type="text" id="desc" name="desc"
                                        innerRef={(input) => this.desc = input}  />
                                </FormGroup>
                            </div>
                        </div>
                        <br/>
                        <div className="row pl-5">
                            <div className="col-6">    
                                <Button color="primary" onClick={this.creatingItems}>Add Item</Button>
                            </div>
                        </div>
                        <br/>
                    </Form>
                </ModalBody>
            </Modal>
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
    };
}

export default AllItemComponent;