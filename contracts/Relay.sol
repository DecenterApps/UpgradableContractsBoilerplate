pragma solidity ^0.4.15;

import "./DelegateProxy.sol";
import "./Manager.sol";

contract Relay is DelegateProxy {
    
    Manager public manager;

    function Relay(address managerAddress) public {
        manager = Manager(managerAddress);
    }

    function () payable public {
        delegatedFwd(manager.getActiveContract(), msg.data);
    }
}