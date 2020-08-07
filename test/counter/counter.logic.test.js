const {
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expectEvent, // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

const {ethers} = require("@nomiclabs/buidler");

const {expect} = require("chai");

describe("Counter (logic)", function () {
  let buidlerCounter;
  let buidlerOther;

  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const Other = await ethers.getContractFactory("Other");

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    buidlerCounter = await Counter.deploy();
    await buidlerCounter.deployed();
    buidlerOther = await Other.deploy();
    await buidlerOther.deployed();

    // We can interact with the contract by calling `buidlerToken.method()`
    await buidlerCounter.initialize();
    await buidlerCounter.setOther(buidlerOther.address);
  });

  it("should have a value", async function () {
    expect(await buidlerCounter.value()).to.equal(1);
  });

  it("should increase value", async function () {
    await buidlerCounter.increase();
    expect(await buidlerCounter.value()).to.equal(2);
  });

  it("should call other", async function () {
    expect(await buidlerCounter.callOther());
  });

  it("should call me", async function () {
    expect(await buidlerCounter.callMe());
  });
});
