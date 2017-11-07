pragma solidity ^0.4.15;

import "./Storage.sol";

contract Upgradable2 is Storage {

    uint a;
    uint b;

    function setA(uint _a) {
        a = _a + 10;
    }

    function getA() constant returns(uint) {
        return a;
    }

    function setB(uint _b) {
        b = _b;
    }

    function getB() constant returns(uint) {
        return b;
    }

}