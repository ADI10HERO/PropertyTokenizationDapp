import React, { Component } from 'react';
import web3 from './web3';
import auction from './auction';


class App extends Component {

    
state = {

builder: '',
investor: '',
buyer: '',

avail: '',
price: '',
rooms: '',
conversions: '',
closingRemark:'',

investor_booking: '',
buyer_booking: ''
};


async componentDidMount() {
const manager = await auction.methods.manager().call();
const latestBid = await auction.methods.latestBid().call();
const latestBidder = await auction.methods.latestBidder().call();
const seller = await auction.methods.seller().call();
const balance = await web3.eth.getBalance(auction.options.address);
this.setState({ manager, latestBid, latestBidder, seller, balance });
}



investor_buy= async (event) => {
event.preventDefault();
const accounts = await web3.eth.getAccounts();
await auction.methods.little_prop(this.state.investor_booking).send({
from: accounts[0]
});
this.setState({ investor: accounts[0] });
}

print_avail= async (event) => {
    event.preventDefault();
    avail = await auction.methods.avail().call();
    this.state.avail  = avail ;
}

buyer_buy= async (event) => {
event.preventDefault();
const accounts = await web3.eth.getAccounts();
await auction.methods.buy(this.state.buyer_booking).send({
from: accounts[0]
});
this.setState({ buyer: accounts[0] });
    
}


onFinishSubmit = async (event) => {
event.preventDefault();
const accounts = await web3.eth.getAccounts();
await auction.methods.allpropsold().send({
from: accounts[0]
});
this.setState({ closingRemark: 'Selling has been closed.' })
}

show = async (event) => {
event.preventDefault();
arr = await auction.methods.bahot_ids().call();
for(var i in arr) {
        print_r(i) + '\t';
    }

}

render() {
return (
<div>
                <h2>Auction Contract</h2>
                <p>This contract is managed by {this.state.manager}.</p>
                <p>The seller is {this.state.seller}.</p>
                <p>The lattest bidder is {this.state.latestBidder}.</p>
                <p>The lattest bid is {web3.utils.fromWei(this.state.latestBid, 'ether')} ether.</p>
                <p>The balance in the contract is {web3.utils.fromWei(this.state.balance, 'ether')} ether.</p>
                <hr />
                <h4>Auction by seller</h4>
                
                <label>inversor</label>


                //this is to be used
                <p>the availble area is  {this.state.avail} sqft.</p>    

                <input
                value={this.state.investor_booking}
                onChange={event => this.setState({ investor_booking: event.target.value })}
                />
                
                <button onClick={this.investor_buy}>Buy</button>
                <hr />
                //conversion 
                
                <p>{this.show()}</p>
                <p> 400 sqft consist of one house.</p>                
                <input
                value={this.state.buyer_booking}
                onChange={event => this.setState({ buyer_booking: event.target.value })}
                />
                
                <button onClick={this.buyer_buy}>Buy</button>
                <hr />


                <h4>Closing Selling</h4>
                <button onClick={this.onFinishSubmit}>Close Selling</button>
                <p>{this.state.closingRemark}</p>
</div>
);
}
}
export default App;

