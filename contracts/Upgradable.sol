pragma solidity ^0.4.15;

import "./Storage.sol";

contract Upgradable is Storage {

    uint a;

    function setA(uint _a) {
        a = _a;
    }

    function getA() constant returns(uint) {
        return a;
    }

}