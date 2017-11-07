const Relay = artifacts.require("Relay.sol");
const Upgradable = artifacts.require("Upgradable.sol");
const Upgradable2 = artifacts.require("Upgradable2.sol");
const Manager = artifacts.require("Manager.sol");

const { hash } = require('eth-ens-namehash');

contract('Upgradable', async (accounts) => {

    let relay, manager;

    it('Should call upgradable through the Relay contract', async () => {

        manager = await Manager.new();

        // grab the address of upgradable contract
        const app = await Upgradable.new();

        const version = hash("v1.0.0");

        await manager.addContract(version, app.address);
        await manager.setActiveContract(version);

        // create a proxy contract that's just going to delegate calls and keep state
        relay = await Relay.new(manager.address);

        // The upgradable contract that will change
        const upgradable = await Upgradable.at(relay.address);

        await upgradable.setA(42);

        const res = await upgradable.getA();

        assert.equal(res.valueOf(), 42);
    });

    it('Should upgrade the contract and how it works while keeping the storage', async () => {

        const app = await Upgradable2.new();

        const version = hash("v1.1.0");

        await manager.addContract(version, app.address);
        await manager.setActiveContract(version);

        const upgradable2 = await Upgradable2.at(relay.address);

        const res = await upgradable2.getA();

        await upgradable2.setA(42);
        
        const a = await upgradable2.getA();

        assert.equal(a.valueOf(), 52, "Changed the way the function works");

    });

    it('should call a new updated method from the contract', async () => {

        const upgradable2 = await Upgradable2.at(relay.address);

        await upgradable2.setB(42);
        
        const b = await upgradable2.getB();

        assert.equal(b.valueOf(), 42);
    });

    it('should fail to set an active contract if not the owner', async () => {
        
        const version = hash("v1.0.0");
        
        try {
            await manager.setActiveContract(version, { from: accounts[2]});
        } catch(err) {
            assert.isTrue(err.toString().includes('invalid opcode'));
        }
    });

    it('should fail to add a contract if not the owner', async () => {
        
        const version = hash("v1.0.0");
        
        try {
            await manager.addContract(version, "0x0", { from: accounts[2]});
        } catch(err) {
            assert.isTrue(err.toString().includes('invalid opcode'));
        }
    });
});