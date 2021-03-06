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


async function calDist(c,manu,cnt) {
    
    var pin = c.custpincode;
    var min = 999999;
    var x; // res
    var y; // y
    var add ;
    for (var i = 0; i < cnt; i++){
        y =  manu[i].manupincode;
         
        x = subtract(pin,y);
        if(min>x){
            min = x;
            y = manu[i];
            add = manu[i].manuadd;
        }
    }

    return add;
}

function subtract(a, b){
    if (a > b){
        return a-b;
    }
    else{
        return b-a;
    }
}

var quantity;
var total;
var finalid;

class Allpatrender extends Component{
    // var day = moment.unix(dish.dateofComp); 
    // var xy = dish.dateofComp;
    // var date = new Date(xy*1000);
    // var time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // var yz = xy != 0?"bg-success text-white":"";
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , isModalOpen: false,qty: 0};
        this.toggleModal = this.toggleModal.bind(this);
        this.converb = this.converb.bind(this);
        this.conver = this.conver.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.creatingShipment = this.creatingShipment.bind(this);
        this.buyitem = this.buyitem.bind(this);
    }
    buyitem = async(typeitem) => {
        var res = await this.props.contract.methods.itemcount().call();
        var response2 = [];
        var response3= [];
        var cntres2 = 0 ;
        var cntres3 = 0;
        var rex2;
        for(var i=1;i<=res;i++){
            var rex = await this.props.contract.methods.Items(i).call();
            if(rex.itemtype == typeitem){
            response2.push(rex);
            cntres2++;
            }
        }
        
        console.log(response2);
        for(var j = 0;j<cntres2;j++){
            rex2 = await this.props.contract?.methods.Manufacturers(response2[j].manadr).call();
            response3.push(rex2);
            cntres3++;
        }
        console.log(response3);
        var nearadd = await calDist(customer,response3,cntres3);
        console.log(nearadd);
        
        //  for(var k = 0; k<cntres2;k++){
        //     if(nearadd == response.manadr){
        //         finalid = response2.itemid;
        //     }
        //  }
        
        return(nearadd);
    }  
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
    }
    converb = async (x) => {
        util1 = (Web3.utils.fromWei(x, 'milli'));
    }
    conver =  (x) => {

        util =  (Web3.utils.toWei(x, 'milli'));
        return util;
    }

    totalvalue = () => {
        quantity = this.qty.value;
        total = util1 * quantity;
        alert(total);
    }
    creatingShipment = async(event) => {
        event.preventDefault();
        var itemcat =  this.props.dish?.itemtype;
        var qty = this.state.qty;
        var str = "Added";
        var totalamt = conver((util1*qty).toString());
        var manadr = await this.buyitem(parseInt(this.props.dish.itemtype));
        const res = await this.props.contract?.methods.createShipment(itemcat,qty,str,totalamt,0,manadr).send({from: this.props.accounts,gas : 1000000});
        console.log(res);
        this.toggleModal();

    }
    

    render() {
        
        var but = this.props.registered == 2? "visible" : "invisible";
        this.converb(this.props.dish.price.toString());
        var cl = this.props.dish.itemtype == 0? "fa fa-laptop fa-5x" :((this.props.dish.itemtype ==1)?"fa fa-mobile fa-5x" :"fa fa-desktop fa-5x" );
        return(
           
            <Card >
            <i className={cl}></i>
            <CardBody>
            <CardTitle>Item ID : {this.props.dish.itemid}</CardTitle>
            <CardText><small>Item Type : {category(parseInt(this.props.dish.itemtype))}</small></CardText>
            <CardText><small>Item Price : {util1}</small></CardText>
            <CardText><small>GST : {this.props.dish.gst}</small></CardText>
            <CardText><small>Description : {this.props.dish.description}</small></CardText>

            <Col md={{size:10, offset:1}}>
                <Button className={but} type="submit" color="primary" onClick={this.toggleModal}>
                    Buy Item
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="modal-md">
                    <ModalHeader toggle={this.toggleModal} className="pl-5">Item</ModalHeader>
                        <Card className="pb-5">
                            <p className="m-auto p-4"><i className={cl}></i></p>
                            <p className="m-auto p-2">Item Type : {category(parseInt(this.props.dish.itemtype))}</p>
                            <p className="m-auto p-2">Item Price : {util1}</p>
                            <div className="row m-auto pt-2">
                                <p>Item Quantity : </p>
                                <p> <Input type="text" id="qty" name="qty" onChange={this.handleInputChange}></Input></p>
                            </div>
                            <p className="m-auto p-2">TotalAmt : {util1 * (this.state.qty)}</p>
                            <p className="m-auto p-2">Description : {this.props.dish.description}</p>
                            <p className="m-auto p-2"><Button type="submit" onClick={this.creatingShipment} >Confirm</Button> </p>
                        </Card>
                </Modal>
            </Col>
            </CardBody>
            
        </Card>
        )
    }
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

function categoryrev(i) {

    
        if(i == "Laptop")
        {
            return 0;
        }
        else if(i == "Mobile")
        {
            return 1;
        }
        else if(i == "Desktop")
        {
            return 2;
        }
        
}
var itemtype;
var itemprice;
var itemgst;
var itemdesc;


class AllItemComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , cust: [] , manuf: [] , isModalOpen1: false  }
        this.toggleModal1 = this.toggleModal1.bind(this);
        //this.com = this.com.bind(this);
    }
    
    
    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }
    createItem = async(itemtype,itemdesc,itemprice,itemgst) => {
        const res = await this.props.contract.methods.createItems(itemtype,itemdesc,itemprice,itemgst).send({from: this.props.accounts,gas : 1000000});
        console.log(res);
    }
    creatingItems = () => {
        itemtype = categoryrev(this.type.value);
        console.log(itemtype);
        itemprice = (conver(this.price.value));
        
        itemgst = this.gst.value;
        itemdesc = this.desc.value;
        console.log(itemtype);
        this.createItem(itemtype,itemdesc,itemprice,itemgst);
        this.toggleModal1();
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
                    < Allpatrender dish={x} contract={this.props.contract} accounts={this.props.accounts} registered = {this.props.registered}/>
                </div>
            );
        })
        
        var ch = this.props.registered == 1? "visible" : "invisible";
        
        return(
        <div className="container">
            <h2>All Items</h2>
            <Button color="success" className={ch} onClick={this.toggleModal1}>
                Add Item
            </Button>
            
            <Modal isOpen={this.state.isModalOpen1} toggle={this.toggleModal1} className="modal-xl">
                <ModalHeader toggle={this.toggleModal1}>
                    <h3>Add Items</h3>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="row pl-5 pr-5">
                            <div className="col-6">
                                <FormGroup>
                                    <Label htmlFor="type" className="ml-3">Item Type</Label>
                                    <Input type="select" id="type" name="type" innerRef={(input) => this.type = input}>
                                        <option>Select Item Type</option>
                                        <option>Mobile</option>
                                        <option>Laptop</option>
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