pragma solidity ^0.4.15;

contract Manager {

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    mapping(bytes32 => address) public contracts;

    address public owner;
    bytes32 public activeContract;

    function Manager() public {
        owner = msg.sender;
    }

    function setActiveContract(bytes32 contractVersion) public onlyOwner {
        require(contracts[contractVersion] != 0x0);
        activeContract = contractVersion;
    }

    function addContract(bytes32 contractVersion, address contractAddress) public onlyOwner {
        contracts[contractVersion] = contractAddress;
    }

    function getActiveContract() public constant returns(address) {
        return contracts[activeContract];
    }

}