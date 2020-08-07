// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;

/// @author The Solidity Team
/// @title A simple storage example

// test 2
contract Counter {
    uint256 public value;
    Other public otherContract;

    /// initialize `Counter`.
    function initialize() public {
        value = 1;
    }

    function increase() public {
        value++;
    }

    /** @notice setOther smartcontract
     * @param _other the other smartcontract
     * @dev keep in mind this is a other contract is just to check the gas of call
     */
    function setOther(Other _other) public {
        otherContract = _other;
    }

    /// @notice callOther triggers a call to another smartcontract
    /// @dev keep in mind this is a other contract is just to check the gas of call
    function callOther() public {
        otherContract.callMe();
    }

    /**
        @notice callOther triggers a call to another smartcontract
        @dev keep in mind this is a other contract is just to check the gas of call
    */
    function callMe() public {}
}

contract Other {
    function callMe() public view {}
}
