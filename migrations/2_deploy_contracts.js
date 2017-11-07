const AppProxy = artifacts.require("./AppProxy.sol");
const DelegateProxy = artifacts.require("./DelegateProxy.sol");
const Upgradable = artifacts.require("./Upgradable.sol");
const Upgradable2 = artifacts.require("./Upgradable2.sol");

module.exports = function(deployer, network) {
    deployer.deploy(DelegateProxy);
    deployer.deploy(Upgradable);
    deployer.deploy(Upgradable2);
    deployer.deploy(AppProxy);
};
