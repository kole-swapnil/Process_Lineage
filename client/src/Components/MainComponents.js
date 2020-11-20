import React, { Component } from "react";
import BNContract from "../contracts/BrimNet.json";
import getWeb3 from "../getWeb3";
import "../App.css";
import Header from "./HeaderComponent";
import Home from './HomeComponent';
import SignUp from "./SignUpComponent";
import  AllItemComponent  from "./ItemComponent";
import Shipment from "./ShipmentComponent";
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './FooterComponent';
import RegisterComp from './RegisterComponent';
import AllMemComponent from './AllmemberComponent';


//import HDWalletProvider from "@truffle/hdwallet-provider";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { storageValue: 0, web3: null, accounts: null,balance:0, contract: null ,res : null,registered : 0,govt : null};
 }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0])
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BNContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BNContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      var govt = networkId == 3?"0x4271AC6Bb565D120e2Ac1C3fb855aE5Dad6aE8ff":"0x8c009421d817D9AB4b39Ad93c2dF05A3253F5f4a";
      console.log(govt);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(instance)
      this.setState({ web3, accounts : accounts[0] , contract: instance,balance,govt });
      
      if(accounts[0] == govt){
        this.setState({registered : 5});
        console.log(this.state.registered);
        }
      var res = await this.state.contract.methods.manufacturercount().call();
        
      for(var i=1;i<=res;i++){
          var rex = await this.state.contract?.methods.Manu_ids(i).call();
          console.log(rex);
          if(rex == this.state.accounts){
            this.setState({registered : 1});
            console.log(1);
            break;
          }
   
      }
      
      var res1 = await this.state.contract.methods.customercount().call();
      console.log(this.state.accounts);
      for(var i=1;i<=res1;i++){
          var rex1 = await this.state.contract?.methods.cust_ids(i).call();
            console.log(rex1);
          if(rex1 ==  this.state.accounts){
          
            this.setState({registered : 2});
            console.log(2);
            break;
          }   
          
      }

      
      
     
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      
      console.error(error);
    }
  };

  async checks(address){
   
                 }
  
  reghandler = (vt) => {
      this.setState({registered : vt });
    }

  render() {
    this.checks(this.state.accounts);
    return (
      <div className="App">
        <Header contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered} balance={this.state.balance} web3={this.state.web3}/>
        <Switch>
            <Route exact path="/home" component={() => <Home contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered}/>}/>
            <Route exact path="/signup" component={() => <SignUp contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered} reghandler = {this.reghandler}/>}/> 
            <Route exact path='/items' component={() => <AllItemComponent contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered}/>}/>
            <Route exact path="/shipment" component={() => <Shipment contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered}/>}/>
            <Route exact path="/register" component={() => <RegisterComp contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered}/>}/> 
            <Route exact path="/allmem" component={() => <AllMemComponent contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered}/>}/>
            <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    )
  }
}
export default Main;