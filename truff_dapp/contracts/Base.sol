pragma solidity ^0.4.19;
contract Property {
  address public builder;
  address public investor;
  //address public seller;
  uint public toke_price; //conv ke baad
  uint public toke_val; //sqft mein
  uint public okay; //selling price of house
  address public buyer;
  //uint public latestprice; //pata_nahi_kyu 
  uint public avail; //sqft mein
  uint cf=1;
  /*
  struct kuch_toh_id_type {
    uint  value;
    uint sqft;
 }*/
 
 uint room_ids;
 
  uint [] public bahot_ids = [0,1,2,3,4,5,6,7,8,9];
  function Property() public {
    avail = 4000;
    builder = msg.sender;
  }
 
  function little_prop(uint _toke_val) public payable{
    require(avail>=_toke_val);
    
    toke_price = cf * _toke_val * 1 ether; //1000000000000000000;
    avail = avail - _toke_val;
    if (buyer != 0x0) {
      builder.transfer(uint(toke_price));
    }
    //builder.transfer(uint(toke_price));
    investor = msg.sender;
 
  }
  
 function show() view public returns(uint[]){
    return (bahot_ids);
 }
 
  function buy(uint  room_id) public payable {
    require(avail>400);
    avail = avail-400;
    okay= cf * 400 * 1 ether;
    if (buyer != 0x0) {
      builder.transfer(uint(okay));
    }
    delete bahot_ids[room_id];
  }
 
  function allpropsold() restricted public {
    builder.transfer(address(this).balance);
    avail=0;
  }
 
  modifier restricted() {	
    require(msg.sender == builder);
    _;
  }
}

