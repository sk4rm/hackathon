const { ethers } = require("hardhat")

async function main() {
    // const greeterABI = await ethers.getContractFactory("Greeter")
    // const greeter = await greeterABI.deploy("Hello, Hardhat!")
    // console.log("Greeter deployed at:", greeter.address)

    // const greet = await greeter.greet()
    // console.log("Greet value:", greet)

    const Tick3tABI = await ethers.getContractFactory("Tick3t")
    const Tick3t = await Tick3tABI.deploy()
    console.log("Tick3t deployed at:", Tick3t.address)
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })