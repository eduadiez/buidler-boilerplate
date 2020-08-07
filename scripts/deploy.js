// We require the Buidler Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `buidler run <script>` you'll find the Buidler
// Runtime Environment's members available in the global scope.
const bre = require("@nomiclabs/buidler");

const {
    TASK_FLATTEN_GET_FLATTENED_SOURCE
} = require("@nomiclabs/buidler/builtin-tasks/task-names");

async function main() {
    // Buidler always runs the compile task when running scripts through it. 
    // If this runs in a standalone fashion you may want to call compile manually 
    // to make sure everything is compiled
    // await bre.run('compile');

    // We get the contract to deploy
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    await token.deployed();

    console.log("Token address:", token.address);

    let flattenedSource = await bre.run(TASK_FLATTEN_GET_FLATTENED_SOURCE);

    await bre.run("verify-contract", {
        address: token.address,
        contractName: "Token",
        // libraries: JSON.stringify({
        //   "SafeMath": "0x292FFB096f7221c0C879c21535058860CcA67f58"
        // }),
        source: flattenedSource,
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });