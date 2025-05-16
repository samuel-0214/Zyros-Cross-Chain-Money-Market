// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IWormhole {
    struct VM {
        uint8 version;
        uint32 timestamp;
        uint32 nonce;
        uint16 emitterChainId;
        bytes32 emitterAddress;
        uint64 sequence;
        uint8 consistencyLevel;
        bytes payload;
        uint32 guardianSetIndex;
        bytes32[] signatures;
        bytes32 hash;
    }

    function parseAndVerifyVM(bytes calldata encodedVM)
        external
        view
        returns (
            VM memory vm,
            bool valid,
            string memory reason
        );
}

contract ZyrosBaseReceiver {
    address public immutable wormhole;
    bytes32 public immutable solanaEmitter;

    mapping(bytes32 => bool) public processed;

    event CrossChainTransferReceived(address indexed user, uint256 amount);

    constructor(address _wormhole, bytes32 _solanaEmitter) {
        wormhole = _wormhole;
        solanaEmitter = _solanaEmitter;
    }

    function receiveMessage(bytes calldata encodedVAA) external {
        (IWormhole.VM memory vm, bool valid, ) = IWormhole(wormhole).parseAndVerifyVM(encodedVAA);
        require(valid, "Invalid VAA");
        require(vm.emitterChainId == 1, "Not Solana");
        require(vm.emitterAddress == solanaEmitter, "Wrong emitter");

        bytes32 hash = keccak256(encodedVAA);
        require(!processed[hash], "Already processed");
        processed[hash] = true;

        address user = address(uint160(uint256(bytes32(vm.payload[0:32]))));
        uint64 amount = uint64(bytes8(vm.payload[32:40]));

        // This is where you’d unlock USDC or ETH. For now, just emit.
        emit CrossChainTransferReceived(user, amount);
    }
}
