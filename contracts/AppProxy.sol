pragma solidity ^0.4.15;

import "./DelegateProxy.sol";
import "./Manager.sol";

contract AppProxy is DelegateProxy {
    
    Manager public manager;

    function AppProxy(address managerAddress) {
        manager = Manager(managerAddress);
    }

    function () payable public {
        delegatedFwd(manager.getActiveContract(), msg.data);
    }
}