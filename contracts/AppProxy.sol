pragma solidity ^0.4.15;

import "./DelegateProxy.sol";

contract AppProxy is DelegateProxy {

    address public target;

    function AppProxy(address _target) {
        target = _target;
    }

    function setTarget(address _target) {
        target = _target;
    }

    function () payable public {
        delegatedFwd(target, msg.data);
    }
}