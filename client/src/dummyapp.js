const ProLineContract = require("./contracts/BrimNet.json");
const Web3 = require("web3");
var instance;
var accounts;

Mount = async () => {
    const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );

    const web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ProLineContract.networks[networkId];
     instance = new web3.eth.Contract(
        ProLineContract.abi,
      deployedNetwork && deployedNetwork.address,
    );

    // console.log("gfsd",instance);
    // console.log("gd",accounts);
     //   addingManufacturer("Kole",751002);
}


Mount();

addingManufacturer = async(name,pinc) => {
    const res = await instance.methods.addManufacturer(name,pinc).send({from: accounts[1],gas : 1000000});
    console.log(res);
}
updatingManufacturer = async(name,pinc) => {
    const res = await instance.methods.updateManufacturer(name,pinc).send({from: accounts[1],gas : 1000000});
    console.log(res);
}

addingCustomer = async(name,pinc) => {
    const res = await instance.methods.addCustomer(name,pinc).send({from: accounts[1],gas : 1000000});
    console.log(res);
}
updatingCustomer = async(name,pinc) => {
    const res = await instance.methods.modifyCustomer(name,pinc).send({from: accounts[1],gas : 1000000});
    console.log(res);
}

creatingItems = async(itemtype,desc,price,gst,model) => {
    const res = await instance.methods.createItems(itemtype,desc,price,gst,model).send({from: accounts[1],gas : 1000000});
    console.log(res);
}
creatingShipment = async(itemid,qty,shipstate,totalamt,payment,manadr) => {
    const res = await instance.methods.createShipment(itemid,qty,shipstate,totalamt,payment,manadr).send({from: accounts[1],gas : 1000000});
    console.log(res);
}

updateShipstate = async(shipid,shipstate) => {
    const res = await instance.methods.updateShstate(shipid,shipstate).send({from: accounts[1],gas : 1000000});
    console.log(res);
}

updateShipstatus = async(shipid,paystatus) => {
    const res = await instance.methods.updateShstate(shipid,paystatus).send({from: accounts[1],gas : 1000000});
    console.log(res);
}

