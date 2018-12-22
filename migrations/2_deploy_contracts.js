var Auction = artifacts.require("property");

module.exports = function(deployer) {
  deployer.deploy(Auction);
};
