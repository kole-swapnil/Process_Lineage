import React, { Component } from 'react';
//import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,
    Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText , Modal, ModalHeader, ModalBody} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import StepProgressBar from 'react-step-progress';
import Web3 from "web3";
import 'react-step-progress/dist/index.css';

var x = 'hello';

// Step Progress 
    const step0Content = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Added </h3> ;
    const step1Content = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Pending</h3>;
    const step2Content = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Confirmed </h3>;
    const step3Content = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Manufactured </h3>;
    const step4Content = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Packaged </h3>;
    const step5Content = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>OutForDelivery </h3>;
    const step6Content = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Delievered </h3>;
    const step7Content = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Cancel </h3>;

    function onFormSubmit() {
    
    }

    const step0Contents = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>NotPaid </h3>;
    const step1Contents = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>InSc</h3>;
    const step2Contents = <h3 className="mt-4 pb-0" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Received </h3>;

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
                value = 'added';
                break;
            case 1:
                value = 'pending';
                break;
            case 2:
                value = 'confirmed';
                break;
            case 3:
                value = 'manufactured';
                break;
            case 4:
                value = 'packaged';
                break;
            case 5:
                value = 'outfordel';
                break;
            case 6:
                value = 'delievered';
                break;
            case 7:
                value = 'cancel';
                break;
        }
        return value;
    }
    function status(s) {
        
        switch(s) {
            case 0:
                value1 = 'notpaid';
                break;
            case 1:
                value1 = 'inSc';
                break;
            case 2:
                value1 = 'received';
                break;
        }  
        return value1; 
    }

    var val ;
// Class 
    var alldocs = [];
    class Allpatrender extends Component{
        constructor(props){
            super(props);
            this.state = { docCount : 0, dish: [] , isModalOpen: false};
            this.toggleModal = this.toggleModal.bind(this);
            this.converb = this.converb.bind(this);
        }  
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        converb = async (x) => {
            util1 = (Web3.utils.fromWei(x, 'milli'));
        }
        // var day = moment.unix(dish.dateofComp); 
        // var xy = dish.dateofComp;
        // var date = new Date(xy*1000);
        // var time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
        // var yz = xy != 0?"bg-success text-white":""; 
        
    render(){
        this.converb(this.props.dish.totalamt.toString());
        return(
            <Card >
            <i className="fa fa-envelope fa-5x"></i>
            <CardBody>
            <CardTitle>Shipment ID : {this.props.dish.itemcat}</CardTitle>
            <CardText><small>Item Cat : {this.props.dish.itemcat}</small></CardText>
            <CardText><small>Item qty : {this.props.dish.qty}</small></CardText>
            <CardText><small>Shipment Status : {shipstate(parseInt(this.props.dish.shipstate))}</small></CardText>
            <CardText><small>Totalamt : {util1}</small></CardText>
            <CardText><small>Payment Status :{status(parseInt(this.props.dish.payment))}</small></CardText>
            
            <Col md={{size:10, offset:1}}>
                <Button color="primary" onClick={this.toggleModal}>
                    Shipment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="modal-xl">
                <ModalHeader toggle={this.toggleModal}>Shipment Status</ModalHeader>
                <ModalBody>
                    <StepProgressBar startingStep={1} primaryBtnClass={"pri"} secondaryBtnClass={"pri"} onSubmit={onFormSubmit} steps={[
                        {
                            label: 'Added',
                            subtitle: x,
                            name: 'step 0',
                            content: step0Content
                         },
                        {
                            label: 'Pending',
                            subtitle: x,
                            name: 'step 1',
                            content: step1Content
                        },
                        {
                            label: 'Confirmed',
                            subtitle: x,
                            name: 'step 2',
                            content: step2Content
                        },
                        {
                            label: 'Manufactured',
                            subtitle: x,
                            name: 'step 3',
                            content: step3Content
                        },
                        {
                            label: 'Packaged',
                            subtitle: x,
                            name: 'step 4',
                            content: step4Content
                        },
                        {
                            label: 'OutForDelivery',
                            subtitle: x,
                            name: 'step 5',
                            content: step5Content
                        },
                        {
                            label: 'Delievered',
                            subtitle: x,
                            name: 'step 6',
                            content: step6Content
                        },
                        {
                            label: 'Cancel',
                            subtitle: x,
                            name: 'step 7',
                            content: step7Content
                        }
                    ]}
                    />
                    <h5>Payment Status</h5>
                    <hr/>
                    <StepProgressBar startingStep={2} primaryBtnClass={"pri"} secondaryBtnClass={"pri"}  onSubmit={onFormSubmit1} steps={[
                        {
                        label: 'NotPaid',
                        subtitle: x,
                        name: 'step 0',
                        content: step0Contents
                         },
                        {
                        label: 'InSc',
                        subtitle: x,
                        name: 'step 1',
                        content: step1Contents
                        },
                        {
                        label: 'Received',
                        subtitle: x,
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
        this.state = { docCount : 0, dish: [] , isModalOpen: false};
    }  
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.shipmentcount().call();
           console.log(res);    
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.Shipments(i).call();
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
