import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const wormhole = "0x706abc4E45D419950511e474C7B9Ed348A4a716c"; // Base Sepolia Wormhole CoreBridge
  const solanaEmitter = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd"; // 32-byte address

  const ZyrosReceiver = await ethers.getContractFactory("ZyrosBaseReceiver");
  const receiver = await ZyrosReceiver.deploy(wormhole, solanaEmitter);

  await receiver.deployed();
  console.log(`✅ ZyrosBaseReceiver deployed to: ${receiver.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
