# upgradable
Building smart contracts that are completely upgradable

This design was inspired by the talk Jorge Izquierdo gave at devcon3 [link](https://www.youtube.com/watch?v=aMs0wAFIu7I&feature=youtu.be&t=1h19m26s)

Solidity smart contracts are immutable but as the technology is at a very early stage 
and contracts need to have feature/security upgrades some sort of upgradability mechanizam is needed.

The way we are acheving upgradability is through the delegateCall functionality which can call from one contract
to another, delegating all the storage and msg data with the call. 

We can see in more detail how the system would work from the following diagram:


![diagram](https://i.imgur.com/KIdwMr3.png)

As you can see the user (your aplication) only needs to interact with the Relay contract, 
which will in turn forward all the call to the currently active Upgradable contract.

Manager will be used by the owner of the contract to set the new versions of the Upgradble contract which 
will be used by the Relay to call the correct contract.
All the memory will be in the Relay contract so when upgrading to a new contract your data is not lost,
just be carefull when adding new data that you don't override the existing one 
(always add new variables at the end and be carefull with structs and dynamic arrays)
