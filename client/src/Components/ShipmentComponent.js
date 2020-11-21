import React, { Component } from 'react';
import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,
    Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText , Modal, ModalHeader, ModalBody} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import StepProgressBar from 'react-step-progress';
import Web3 from "web3";
import 'react-step-progress/dist/index.css';

var x = 'hello';
var arr7= [];
var arr8=[];

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs,") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins,") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return hDisplay + mDisplay + sDisplay; 
}
// Step Progress 
    function onFormSubmit() {
    
    }

    const step0Contents = <h3 className="mt-5 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>NotPaid </h3>;
    const step1Contents = <h3 className="mt-5 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>InSmartContract</h3>;
    const step2Contents = <h3 className="mt-5 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Received </h3>;

    function onFormSubmit1() {
    
    }

// Convert price
    var util;
    var util1;
    let conver = async (x) => {

        util =  (Web3.utils.toWei(x, 'milli'));
    }
    let converb = async (x) => {
        util1 = (Web3.utils.fromWei(x, 'milli'));
    }
    let value;
    let value1;
    function shipstate(s) {

        switch(s) {
            case 0:
                value = 'Added';
                break;
            case 1:
                value = 'Pending';
                break;
            case 2:
                value = 'Confirmed';
                break;
            case 3:
                value = 'Manufactured';
                break;
            case 4:
                value = 'Outfordel';
                break;
            case 5:
                value = 'Delievered';
                break;
        }
        return value;
    }
    function status(s) {
        
        switch(s) {
            case 0:
                value1 = 'NotPaid';
                break;
            case 1:
                value1 = 'InSc';
                break;
            case 2:
                value1 = 'Received';
                break;
        }  
        return value1; 
    }

    var vx;
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

    var a;
    var b;
    var val;
    var fun;
// Class 
    var alldocs = [];
    class Allpatrender extends Component{
        constructor(props){
            super(props);
            this.state = { docCount : 0, qty: 0 , dish: [] , isModalOpen: false, isModalOpen1: false, back: true, ships:[],shiptime: [],
                quan : null, payfor:[] , paytime: [],asp : 0,progt:0 , next : [{
                label: a,
                subtitle: b,//this.state.shiptime[cnt]  ,
            content: <h3 className="mt-5 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>{a}</h3>
                }]};
            this.toggleModal = this.toggleModal.bind(this);
            this.toggleModal1 = this.toggleModal1.bind(this);
            this.converb = this.converb.bind(this);
            this.dopayment = this.dopayment.bind(this);
            this.getshipevents = this.getshipevents.bind(this);
            this.getpayevents = this.getpayevents.bind(this);
            this.updateShipstate = this.updateShipstate.bind(this);
            this.cancel = this.cancel.bind(this);
            this.delivered = this.delivered.bind(this);
            this.convery = this.convery.bind(this);
            this.shipstate = this.shipstate.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
        } 

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        toggleModal1() {
            this.setState({
                isModalOpen1: !this.state.isModalOpen1
            });
        }

        shipstate(s) {
                value = '';
            switch(s) {
                case 0:
                    value = 'Added';
                    break;
                case 1:
                    value = 'Pending';
                    break;
                case 2:
                    value = 'Confirmed';
                    break;
                case 3:
                    value = 'Manufactured';
                    break;
                case 4:
                    value = 'Outfordel';
                    break;
                case 5:
                    value = 'Delievered';
                    break;
                case 6:
                    value = 'Cancelled';
                    break;
                        
            }
            return value;
        }
        cancel = async() => {
            
            // const res = await this.props.contract.methods.updateShstate(this.props.dish.shid,"Cancelled").send({from: this.props.accounts,gas : 1000000});
            // console.log(res);
            // const res3 = await this.props.contract.methods.updateShstatus(this.props.dish.shid,2).send({from: this.props.accounts,gas : 1000000});
            // console.log(res3);
            const res2 = await this.props.contract.methods.withdrawmoney(this.props.dish.shid , 2).send({from: this.props.accounts,gas : 1000000})
            console.log(res2);
            this.toggleModal();
        }

        delivered = async() => {
            const res2 = await this.props.contract.methods.withdrawmoney(this.props.dish.shid,1).send({from: this.props.accounts,gas : 1000000})
            console.log(res2);
            this.toggleModal();
        }

        getshipevents = async() => {
            this.toggleModal();
            this.getpayevents();
            var arr =[];
            const timefor = [];
            const timeof = [];
            const req = await this.props.contract.getPastEvents('processchange', {
                filter: { ship_id: this.props.dish.shid },
                fromBlock: 0,    
            });
            var res7 ;
            arr7=[];

            req.forEach(async (ele) => {
                
                const ship_id = (ele.returnValues.ship_id);
                const shstate = (ele.returnValues.shstate);
                const times = (ele.returnValues.times);
                console.log("item : ",ship_id,shstate,times);
                var day = moment.unix(times); 
                var time = day.format('D-MMM-YY, hh:mm:ss a');
                timefor.ship_id = ship_id;
                timefor.shstate = shstate;
                timefor.timenow = times;
                timefor.time = time.toString();
                timeof.push(timefor);
                
                res7 = {
                    label: timefor.shstate,
                    subtitle: timefor.time,//this.state.shiptime[cnt]  ,
                    content: <h3 className="mt-5 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>{timefor.shstate}</h3>
                    }
                arr7.push(timefor.timenow);
                    arr.push(res7);
                
            });
            console.log(arr.length);
            arr8 =[];
            for(var i = 1; i< arr7.length; i++){
                var timedif = secondsToHms((arr7[i]) - (arr7[i-1]));
                console.log(timedif)
                arr8.push(timedif);        
            }
            
            var po = arr.length - 1 
            this.setState({shiptime : timeof,next : arr,asp : po});
            
            //  console.log(this.state.ships);
            console.log(this.state.shiptime);
        }
        getpayevents = async() => {
            const pays =[];
            const req1 = await this.props.contract.getPastEvents('processpay', {
                filter: { ship_id: this.props.dish.shid },
                fromBlock: 0,
            });
            req1.forEach(async (ele) => {
                
                 const ship_id = (ele.returnValues.ship_id);
                 const paystate = (ele.returnValues.pay);
                 const times = (ele.returnValues.times);
                // console.log("item : ",ship_id,paystate,times);
                var day = moment.unix(times); 
                 var time = day.format('D-MMM-YY, hh:mm:ss a');
                pays.push(time.toString());
                
            });
            this.setState({payfor : pays});
                console.log(this.state.ships)
        }
        getshipState = async (x) => {
            const res = await this.props.contract.methods.getshipstate(this.props.dish.shid).call();
            console.log("dsf",res);
        }
        
        converb = async (x) => {
            util1 = (Web3.utils.fromWei(x, 'milli'));
        }
        converx = async (x) =>{
            var util7 = (Web3.utils.fromWei(x, 'milli'));
            return util7;
        }
        convery =  (x) =>{
            var util8 =  (Web3.utils.toWei(x, 'milli'));
            return util8;
        }
        dopayment = async() => {
          

                const res = await this.props.contract.methods.payitem(this.props.dish.totalamt.toString(),this.props.dish.shid,"Customer Paid").send({from: this.props.accounts,value: this.props.dish.totalamt.toString(),gas : 1000000});
                console.log(res);
        }
        updateShipstate = async() => {
            this.toggleModal1();
            console.log(this.state.quan);
           
             const res = await this.props.contract.methods.updateShstate(this.props.dish.shid,this.state.quan).send({from: this.props.accounts,gas : 1000000});
             console.log(res);
            
            
        }

        handleInputChange(event){
            const target = event.target;
            const value = target.value;
            const name = target.name;
            this.setState({
                [name] : value
            })
        }
        
    render(){
        const prog = arr8.map((x) => {
            return (
                <div style={{paddingRight:'5%',paddingLeft:'5%',display: 'inline',justifyContent:'center', alignItems:'center'}}>
                    <b key={x} className="m-auto" style={{ justifyContent:'center', alignItems:'center'}}>
                        {x} 
                    </b>
                    
                </div>
                
            );
        })

        this.converb(this.props.dish.totalamt.toString());
        a = 1;
        b = this.props.dish.payment;
        var ch ;

        if(this.props.registered == 1){
            ch = "ml-2 visible";
            val = "Next";
            fun = this.toggleModal1;
        }
        else if(this.props.registered == 2){
            ch = "ml-2 visible";
            val = "Pay";
            fun = this.dopayment;
        }
        else {
            ch = "invisible";
        }

        var xy = this.props.dish.states.length;
        --xy;
        var y;

        var bak = this.props.dish.states[xy] == "Cancelled" ? "bg-danger whiteButton" : "blackButton";
    
        if(this.props.registered == 2 && this.props.dish.states[xy] == "Cancelled") {
            y = "invisible";
            ch = "invisible";
        }
        else if(this.props.registered == 2 && this.props.dish.states.length<3) {
            y = "mt-2 visible";
        }
        else if(this.props.registered == 1 && this.props.dish.states[xy] == "Cancelled") {
            y = "invisible";
            ch = "invisible";
        }
        else if(this.props.registered == 1) {
            y = "mt-2 visible";
        }
        else{
            y = "mt-2 invisible";
        }
        
        return(
            <Card className={bak}>
            <i className="fa fa-envelope fa-5x"></i>
            <CardBody>
            <CardTitle>Shipment ID : {this.props.dish.shid}</CardTitle>
            <CardText><small>Item Category : {category(parseInt(this.props.dish.itemcat))}</small></CardText>
            <CardText><small>Item Quantity : {this.props.dish.qty}</small></CardText>
            <CardText><small>Shipment Status : {this.props.dish.states[xy]}</small></CardText>
            <CardText><small>Total Amount : {util1}</small></CardText>
            <CardText><small>Payment Status : {status(parseInt(this.props.dish.payment))}</small></CardText>
            
            <Col sm={{size:12}}>
                <Button color="primary" onClick={this.getshipevents}>
                    Shipment
                </Button>
                <Button className={ch} color="primary" onClick={fun}>
                    {val}
                </Button>
                <Button color="danger" onClick = {this.cancel} className={y}>
                    Cancel
                </Button> 
                
                <Modal isOpen={this.state.isModalOpen1} toggle={this.toggleModal1} className="modal-md" style={{marginTop: 150}}>
                    <ModalHeader toggle={this.toggleModal1} className="pl-5">Add your Shipment Status</ModalHeader>
                    <ModalBody>
                        <div className="row m-auto p-5">
                            <p>Shipment Status : </p>
                            <p> <Input type="text" id="quan" name="quan" onChange={this.handleInputChange}></Input></p>
                            <Button className="ml-5" color="success" onClick = {this.updateShipstate}>Confirm</Button>
                            <Button className="ml-2" color="info" onClick = {this.delivered}>Delivered</Button>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="modal-xl">
                <ModalHeader toggle={this.toggleModal} className="pl-5">Shipment Status</ModalHeader>
                <ModalBody>

                <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                    {prog}
                </div>
                    
                <StepProgressBar startingStep={this.state.asp} primaryBtnClass={"pri"} secondaryBtnClass={"pri"}  
                onSubmit={onFormSubmit1} steps={this.state.next}/>
                        
                    {/* <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                        <Button className={ch} onClick = {this.updateShipstate}>Next</Button>
                        <Button color="danger" onClick = {this.cancel} className={xy}>Cancel</Button>
                    </div> */}
                    <h5 className=" ml-5 ">Payment Status</h5>
                    <hr/>
                    <StepProgressBar startingStep={b++} primaryBtnClass={"pri"} secondaryBtnClass={"pri"}  onSubmit={onFormSubmit1} steps={[
                        {
                        label: 'NotPaid',
                        subtitle: this.state.payfor[0],
                        name: 'step 0',
                        content: step0Contents
                         },
                        {
                        label: 'InSmartContract',
                        subtitle: this.state.payfor[1],
                        name: 'step 1',
                        content: step1Contents
                        },
                        {
                        label: 'Received',
                        subtitle: this.state.payfor[2],
                        name: 'step 2',
                        content: step2Contents
                        }
                    ]}
                    />
                </ModalBody>
                
            </Modal>
            </Col>
            
            </CardBody>
        </Card>
        )
            }
            
    }

class Shipment extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] , isModalOpen: false,shipstates : []};
    }  
    
    async componentDidMount(){
        let res5 = [];
        var res = await this.props.contract?.methods.shipmentcount().call();
           console.log(res);    
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.Shipments(i).call();
                    if(rex.manadr == this.props.accounts){
                        res5 = await this.props.contract.methods.getshipstate(i).call()
                        rex.states = res5;
                        response.push(rex);
                    }
                    else if(rex.custadr == this.props.accounts){
                        res5 = await this.props.contract.methods.getshipstate(i).call()
                        rex.states = res5;
                        response.push(rex);
                    
                      
                    }
                    else if(this.props.registered == 5){
                        res5 = await this.props.contract.methods.getshipstate(i).call()
                        rex.states = res5;
                        response.push(rex);
                    }
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
                    < Allpatrender dish={x} contract={this.props.contract} accounts={this.props.accounts} registered = {this.props.registered}/>
                </div>
            );
        })
    
        return(
        <div className="container">
            <h2>All Shipments</h2>
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



export default Shipment;