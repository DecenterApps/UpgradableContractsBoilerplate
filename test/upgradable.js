const AppProxy = artifacts.require("AppProxy.sol");
const Upgradable = artifacts.require("Upgradable.sol");
const Upgradable2 = artifacts.require("Upgradable2.sol");
const Manager = artifacts.require("Manager.sol");

const { hash } = require('eth-ens-namehash');

contract('Upgradable', async (accounts) => {

    let appProxy, manager;

    it('Should call upgradable through the AppProxy contract', async () => {

        manager = await Manager.new();

        // grab the address of upgradable contract
        const app = await Upgradable.new();

        const version = hash("v1.0.0");

        await manager.addContract(version, app.address);
        await manager.setActiveContract(version);

        // create a proxy contract that's just going to delegate calls and keep state
        appProxy = await AppProxy.new(manager.address);

        // The upgradable contract that will change
        const upgradable = await Upgradable.at(appProxy.address);

        await upgradable.setA(42);

        const res = await upgradable.getA();

        assert.equal(res.valueOf(), 42);
    });

    it('Should upgrade the contract and keep the storage the same', async () => {

        const app = await Upgradable2.new();

        const version = hash("v1.1.0");

        await manager.addContract(version, app.address);
        await manager.setActiveContract(version);

        const upgradable2 = await Upgradable2.at(appProxy.address);

        const res = await upgradable2.getA();

        await upgradable2.setA(42);
        
        const a = await upgradable2.getA();

        assert.equal(a.valueOf(), 52, "Changed the way the function works");

        // await upgradable2.setB(42);
        
        // const b = await upgradable2.getB();

        // console.log(b.valueOf());


    });
});