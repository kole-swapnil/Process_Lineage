pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


contract ProLine{
    
    address payable govt;
    constructor(address payable _govt)public{
        govt = _govt;
    }
    enum State { Added,Pending,Confirmed,Manufactured,Packaged,Outfordel,Delivered,Cancel }
    enum Status {Notpaid, inSc, received}
    uint public manufacturercount = 0;
    uint public customercount = 0;
    uint public itemcount = 0;
    uint public shipmentcount = 0;
    
    event processchange(uint ship_id,State shstate);
    event processpay(uint ship_id,Status pay);
    
    struct Manufacturer{
        string manuname;
        uint manuid;
        address payable manuadd;
        uint manupincode;
    }
    
    mapping(address  => Manufacturer) public Manufacturers;
    mapping(uint => address ) public Manu_ids;
    
    struct Customer{
        string custname;
        uint custid;
        address custadd;
        uint custpincode;
    }
    
    mapping(address => Customer) public Customers;
    mapping(uint => address ) public cust_ids;
    
    
    struct Item {
        uint itemid;
        uint itemtype;
        string description;
        uint price;
        uint gst;
        string model;
    }
    
    struct Shipment{
        uint itemcat;
        uint qty;
        State shipstate;
        uint totalamt;
        Status payment;
        address custadr;
        address manadr;
    }
    
    mapping(uint => Item) public Items;

    mapping(uint => Shipment) public Shipments;
    
    function addManufacturer(string memory _name,uint _pincode)public {
       manufacturercount++;
       Manufacturers[msg.sender].manuname = _name;
       Manufacturers[msg.sender].manuid = manufacturercount;
       Manufacturers[msg.sender].manuadd = msg.sender;
       Manufacturers[msg.sender].manupincode = _pincode;
       Manu_ids[manufacturercount] = msg.sender;

    }
    function updateManufacturer(string memory _name,uint _pincode)public {
       
       Manufacturers[msg.sender].manuname = _name;
       Manufacturers[msg.sender].manuadd = msg.sender;
       Manufacturers[msg.sender].manupincode = _pincode;
    }
    
    function addCustomer(string memory _custname,uint _pincode)public{
        customercount++;
        Customers[msg.sender].custname = _custname;
        Customers[msg.sender].custid = customercount;
        Customers[msg.sender].custadd = msg.sender;
        Customers[msg.sender].custpincode = _pincode;
        cust_ids[customercount] = msg.sender;
    }
    
    function modifyCustomer(string memory _custname,uint _pincode)public{
        Customers[msg.sender].custname = _custname;
        Customers[msg.sender].custadd = msg.sender;
        Customers[msg.sender].custpincode = _pincode;
    }
    
    function calcdist(address _cust)public view returns(address){
        uint pin = Customers[_cust].custpincode;
        uint min = 999999;
        uint res;
        uint x;
        address y;
        for(uint i = 1;i<=manufacturercount;i++){
            x = Manufacturers[Manu_ids[i]].manupincode;
            res = subtract(pin,x);
            if(min>res){
                min = res;
                y = Manu_ids[i];
            }
            
        }
        return y;
    }
    
    
    function subtract(uint a,uint b)internal pure returns(uint){
        if(a>b){
            return a-b;
        }
        else{
            return b-a;
        }
    }
    
    function createItems(uint _itemtype,string memory _description,uint _price,uint _gst,string memory _model)public{
        itemcount++;
        Items[itemcount].itemid = itemcount;
        Items[itemcount].itemtype = _itemtype;
        Items[itemcount].description = _description;
        Items[itemcount].price = _price;
        Items[itemcount].gst = _gst;
        Items[itemcount].model = _model;
    }
    
    function createShipment(uint _itemid,uint _qty,State _shipstate,uint _totalamt,Status _payment,address payable _manadr)public{
        shipmentcount++;
        Shipments[shipmentcount].itemcat =  _itemid;
        Shipments[shipmentcount].qty =  _qty;
        Shipments[shipmentcount].shipstate = _shipstate;
        Shipments[shipmentcount].payment=  _payment;
        Shipments[shipmentcount].totalamt =  _totalamt;
        Shipments[shipmentcount].custadr =  msg.sender;
        Shipments[shipmentcount].manadr =  _manadr;
        
        }
    function updateShstate(uint _shipid,State _shipstate)public{
        Shipments[_shipid].shipstate = _shipstate;
        emit processchange(_shipid,_shipstate);
    }
    
    function updateShstatus(uint _shipid,Status _payment)public{
        Shipments[shipmentcount].payment=  _payment;
        emit processpay(_shipid,_payment);
    }
    
    function payitem(uint _shipid)public payable{
        Item memory x = Items[Shipments[_shipid].itemcat];
        uint totalpay = x.price*(Shipments[_shipid].qty);
        require(msg.value == totalpay,"less money");
        Shipments[_shipid].payment = Status.inSc;
        
        }
        
    function withdrawmoney(uint _shipid)public {
        require(Shipments[_shipid].shipstate == State.Delivered);
        require(Shipments[_shipid].payment == Status.inSc);
        Item memory x = Items[Shipments[_shipid].itemcat];
        uint totalpay = x.price*(Shipments[_shipid].qty);
        uint govtmoney = (totalpay*x.gst)/100;
        uint manumoney = totalpay - govtmoney;
        govt.transfer(govtmoney);
        address payable mann = payable(Shipments[_shipid].manadr);
        mann.transfer(manumoney);
        Shipments[_shipid].payment = Status.received;
        
    }
    function getmanu(uint _shipid)public view returns(address){
        address x =  Shipments[_shipid].custadr;
        address man = calcdist(x);
        return man;
        
    }
    
}