const Relay = artifacts.require("./Relay.sol");
const DelegateProxy = artifacts.require("./DelegateProxy.sol");
const Upgradable = artifacts.require("./Upgradable.sol");
const Upgradable2 = artifacts.require("./Upgradable2.sol");
const Manager = artifacts.require("./Manager.sol");

module.exports = function(deployer, network) {
    deployer.deploy(Manager);
    deployer.deploy(DelegateProxy);
    deployer.deploy(Upgradable);
    deployer.deploy(Upgradable2);
    deployer.deploy(Relay);
};
