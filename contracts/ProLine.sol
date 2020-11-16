pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


contract ProLine{
    
    address payable public govt;
    constructor(address payable _govt)public{
        govt = _govt;
    }
    enum State { Added,Pending,Confirmed,Manufactured,Outfordel,Delivered,Cancelled }
    enum Status {Notpaid, inSc, received}
    uint public manufacturercount = 0;
    uint public customercount = 0;
    uint public itemcount = 0;
    uint public shipmentcount = 0;
    
    event processchange(uint indexed ship_id,State indexed shstate,uint times);
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
    

    
    function createItems(uint _itemtype,string memory _description,uint _price,uint _gst)public{
        itemcount++;
        Items[itemcount].itemid = itemcount;
        Items[itemcount].itemtype = _itemtype;
        Items[itemcount].description = _description;
        Items[itemcount].price = _price;
        Items[itemcount].gst = _gst;
        Items[itemcount].manadr = msg.sender;
 
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
        emit processchange(shipmentcount,_shipstate,now);
        emit processpay(shipmentcount,_payment,now);
        
        }
    function updateShstate(uint _shipid,State _shipstate)public{
        Shipments[_shipid].shipstate = _shipstate;
        emit processchange(_shipid,_shipstate,now);
    }
    
    function updateShstatus(uint _shipid,Status _payment)public{
        Shipments[shipmentcount].payment=  _payment;
        emit processpay(_shipid,_payment,now);
    }
    
    function payitem(uint totamt,uint _shipid)public payable {
        require(msg.value == totamt,"less money");
        Shipments[_shipid].payment = Status.inSc;
        emit processpay(_shipid,Status.inSc,now);

        }
        
    function withdrawmoney(uint _shipid)public payable{
        Shipment memory y = Shipments[_shipid];
        require(y.shipstate == State.Delivered);
        require(y.payment == Status.inSc);
        Item memory x = Items[y.itemcat];
        uint totalpay = x.price*(y.qty);
        uint govtmoney = (totalpay*x.gst)/100;
        uint manumoney = totalpay - govtmoney;
        govt.transfer(govtmoney);
        address payable mann = payable(y.manadr);
        mann.transfer(manumoney);
        y.payment = Status.received;
         emit processpay(_shipid,Status.received,now);
        
    }

    function getbal(address addr)public returns(uint){
        return (addr).balance;
    }
    
}