import { ethers } from "hardhat";
import { expect } from "chai";
import { ZyrosBaseReceiver } from "../typechain-types";

describe("ZyrosBaseReceiver", function () {
  let contract: ZyrosBaseReceiver;
  let dummyWormhole: string;
  let dummyEmitter: string;

  beforeEach(async () => {
    dummyWormhole = "0x0000000000000000000000000000000000000001";
    dummyEmitter = "0x1111111111111111111111111111111111111111111111111111111111111111";

    const ZyrosReceiver = await ethers.getContractFactory("ZyrosBaseReceiver");
    contract = await ZyrosReceiver.deploy(dummyWormhole, dummyEmitter);
    await contract.deployed();
  });

  it("should deploy with correct addresses", async () => {
    expect(await contract.wormhole()).to.equal(dummyWormhole);
    expect(await contract.solanaEmitter()).to.equal(dummyEmitter);
  });

  it("should revert on invalid VAA (mocked call)", async () => {
    const fakeVAA = ethers.utils.hexlify(ethers.utils.randomBytes(100));
    await expect(contract.receiveMessage(fakeVAA)).to.be.reverted;
  });
});
