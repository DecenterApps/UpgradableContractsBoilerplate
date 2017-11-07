const AppProxy = artifacts.require("AppProxy.sol");
const Upgradable = artifacts.require("Upgradable.sol");
const Upgradable2 = artifacts.require("Upgradable2.sol");

contract('Upgradable', async (accounts) => {

    let appProxy;

    it('Should call upgradable through the AppProxy contract', async () => {

        // create a proxy contract that's just going to delegate calls and keep state
        appProxy = await AppProxy.new();

        // The upgradable contract that will change
        const upgradable = await Upgradable.at(appProxy.address);

        // grab the address of upgradable contract
        const app = await Upgradable.new();

        // set the current app contract as a target for the proxy to call
        await appProxy.setTarget(app.address);

        await upgradable.setA(42);

        const res = await upgradable.getA();

        console.log(res.valueOf());
    });

    it('Should upgrade the contract and keep the storage the same', async () => {
        
        console.log(appProxy.address)

        const upgradable2 = await Upgradable2.at(appProxy.address);

        // grab the address of upgradable contract
        const app = await Upgradable2.deployed();

        // set the current app contract as a target for the proxy to call
        await appProxy.setTarget(app.address);

        const res = await upgradable2.getA();
        
        console.log(res.valueOf());

        await upgradable2.setA(42);
        
        const a = await upgradable2.getA();

        console.log(a.valueOf());

        await upgradable2.setB(42);
        
        const b = await upgradable2.getB();

        console.log(b.valueOf());


    });
});