import { ethers } from "hardhat";

async function main() {
  const FoodTraceabilityLite = await ethers.getContractFactory("FoodTraceabilityLite");
  const foodTraceabilityLite = await FoodTraceabilityLite.deploy();

  await foodTraceabilityLite.waitForDeployment();

  console.log("FoodTraceabilityLite deployed to:", await foodTraceabilityLite.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});