pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


contract ProLine{
    
    address payable public govt;
    constructor(address payable _govt)public{
        govt = _govt;
    }
   
    enum Status {Notpaid, inSc, received}
    uint public manufacturercount = 0;
    uint public customercount = 0;
    uint public itemcount = 0;
    uint public shipmentcount = 0;
    
    event processchange(uint indexed ship_id,string shstate,uint times);
    event processpay(uint indexed ship_id,Status indexed pay,uint times);
    
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
        address manadr;
        string description;
        uint price;
        uint gst;
    }
    
    struct Shipment{
        uint shid;
        uint itemcat;
        uint qty;
        string[] shipstate;
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
    

    
    function createItems(uint _itemtype,string memory _description,uint _price,uint _gst)public{
        itemcount++;
        Items[itemcount].itemid = itemcount;
        Items[itemcount].itemtype = _itemtype;
        Items[itemcount].description = _description;
        Items[itemcount].price = _price;
        Items[itemcount].gst = _gst;
        Items[itemcount].manadr = msg.sender;
 
    }
    
    function createShipment(uint _itemid,uint _qty,string memory _shipstate,uint _totalamt,Status _payment,address payable _manadr)public{
        shipmentcount++;
        Shipments[shipmentcount].shid = shipmentcount;
        Shipments[shipmentcount].itemcat =  _itemid;
        Shipments[shipmentcount].qty =  _qty;
        Shipments[shipmentcount].shipstate.push(_shipstate);
        Shipments[shipmentcount].payment=  _payment;
        Shipments[shipmentcount].totalamt =  _totalamt;
        Shipments[shipmentcount].custadr =  msg.sender;
        Shipments[shipmentcount].manadr =  _manadr;
        emit processchange(shipmentcount,_shipstate,now);
        emit processpay(shipmentcount,_payment,now);
        
        }
    function updateShstate(uint _shipid,string memory _shipstate)public{
       
       if(compareStrings(_shipstate,"Cancelled")){
           Shipments[_shipid].shipstate.push(_shipstate);
           emit processchange(_shipid,_shipstate,now);
       }
       uint len = Shipments[_shipid].shipstate.length;
       if(!(compareStrings(Shipments[_shipid].shipstate[(len-1)], "Cancelled"))){
        Shipments[_shipid].shipstate.push(_shipstate);
        emit processchange(_shipid,_shipstate,now);
       }
    }
    
    function updateShstatus(uint _shipid,Status _payment)public{
        Shipments[shipmentcount].payment=  _payment;
        emit processpay(_shipid,_payment,now);
    }
    
    function payitem(uint totamt,uint _shipid,string memory _shipstate)public payable {
        //require(msg.value == totamt,"less money");
        Shipments[_shipid].payment = Status.inSc;
        emit processpay(_shipid,Status.inSc,now);
        Shipments[_shipid].shipstate.push(_shipstate);
        emit processchange(_shipid,_shipstate,now);

        }
        
    function withdrawmoney(uint _shipid,uint z)public payable{
        Shipment memory y = Shipments[_shipid];
        Item memory x = Items[y.itemcat];
        string memory _shipst;
        if(z == 2){
            address payable cus = payable(y.custadr);
            cus.transfer(y.totalamt);
            _shipst = "Cancelled";
            
        }
        else if(z == 1){
        uint govtmoney = (y.totalamt*x.gst)/100;
        uint manumoney = y.totalamt - govtmoney;
        govt.transfer(govtmoney);
        address payable mann = payable(y.manadr);
        mann.transfer(manumoney);
        _shipst = "Delivered";
        }    
        Shipments[_shipid].shipstate.push(_shipst);
        emit processchange(_shipid,_shipst,now);
        Shipments[_shipid].payment = Status.received;
        emit processpay(_shipid,Status.received,now);
            
    }
     function compareStrings(string memory a, string memory b) public pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}

    function getbal(address addr)public view returns(uint){
        return (addr).balance;
    }
    
    
     function getshipstate(uint _shipid)public view returns (string[] memory){
        return Shipments[_shipid].shipstate;
    }
    
}