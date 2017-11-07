pragma solidity ^0.4.15;

contract Manager {

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    mapping(string => address) public contracts;

    address public owner;
    string public activeContract;

    function Manager() public {
        owner = msg.sender;
    }

    function setActiveContract(string contractVersion) public onlyOwner {
        activeContract = contractVersion;
    }

    function addContract(string contractVersion, address contractAddress) public onlyOwner {
        contracts[contractVersion] = contractAddress;
    }

}