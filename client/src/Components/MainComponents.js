import React, { Component } from "react";
import BNContract from "../contracts/BrimNet.json";
import getWeb3 from "../getWeb3";
import "../App.css";
import Header from "./HeaderComponent";
import Home from './HomeComponent';
import Login from "./LoginComponent";
import  AllItemComponent  from "./ItemComponent";
import Shipment from "./ShipmentComponent";
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Footer from './FooterComponent';
import RegisterComp from './RegisterComponent';


//import HDWalletProvider from "@truffle/hdwallet-provider";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null ,res : null,registered : 0};

  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BNContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BNContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
     
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(instance)
      this.setState({ web3, accounts, contract: instance });
      var res = await this.state.contract.methods.manufacturercount().call();
         
      for(var i=1;i<=res;i++){
          var rex = await this.state.contract?.methods.Manu_ids(i).call();
          if(true){
            this.setState({registered : 1});
            console.log(1);
            break;
          }
   
      }
      
      var res1 = await this.props.contract?.methods.customercount().call();
      
      for(var i=1;i<=res;i++){
          var rex1 = await this.props.contract?.methods.cust_ids(i).call();
          if(rex1 == accounts[0]){
            this.setState({registered : 2});
            break;
          }
          
      }
     
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async checks(address){
   
               


                
  }

  render() {
    this.checks(this.state.accounts);
    return (
      <div className="App">
        <Header />
        <Switch>
            <Route exact path="/home" component={() => <Home/>}/>
            <Route path='/items' component={() => <AllItemComponent contract={this.state.contract} accounts={this.state.accounts}/>}/>
            <Route path="/shipment" component={() => <Shipment contract={this.state.contract} accounts={this.state.accounts}/>}/>
            <Route path="/register" component={() => <RegisterComp contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered}/>}/>
            <Route path="/login" component={() => <Login/>}/>
            <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    )
  }
}

export default Main;