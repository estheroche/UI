const ethers = require('ethers')

// const contractArtifact = require('../build/contracts/CaptureTheFlag.json')
// const contractAbi = contractArtifact.abi
const contractAbi = [{ "inputs": [], "name": "decrement", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getLastUser", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "lastUser", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "number", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newNumber", "type": "uint256" }, { "internalType": "address", "name": "_lastUser", "type": "address" }], "name": "setNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

let theContract
let provider

async function initContract() {

    if (!window.ethereum) {
        throw new Error('provider not found')
    }
    window.ethereum.on('accountsChanged', () => {
        console.log('acct');
        window.location.reload()
    })
    window.ethereum.on('chainChanged', () => {
        console.log('chainChained');
        window.location.reload()
    })

    provider = new ethers.providers.Web3Provider(window.ethereum)

    const contractAddress = "0xB8D1BF9DAa1b7cCa8E437E9e571605831dA2Fd23";
    theContract = new ethers.Contract(
        contractAddress, contractAbi, provider.getSigner())

    // await listenToEvents()
    return { contractAddress }
}

async function callIcrement() {
    await window.ethereum.send('eth_requestAccounts')

    const txOptions = { gasPrice: await provider.getGasPrice() }
    const transaction = await theContract.increment(txOptions)
    const hash = transaction.hash
    console.log(`Transaction ${hash} sent`)
    const receipt = await transaction.wait()
    console.log(`Mined in block: ${receipt.blockNumber}`)
}

async function getNumber() {
    await window.ethereum.send('eth_requestAccounts') // accct abstraction under the hood

    const txOptions = { gasPrice: await provider.getGasPrice() }
    const tx = await theContract.getNumber(txOptions)
    console.log(`number: ${tx}`)
}

// let logview

// function log(message) {
//     message = message.replace(/(0x\w\w\w\w)\w*(\w\w\w\w)\b/g, '<b>$1...$2</b>')
//     if (!logview) {
//         logview = document.getElementById('logview')
//     }
//     logview.innerHTML = message + "<br>\n" + logview.innerHTML
// }

// async function listenToEvents() {

//     theContract.on('FlagCaptured', (previousHolder, currentHolder, rawEvent) => {
//         log(`Flag Captured from&nbsp;${previousHolder} by&nbsp;${currentHolder}`)
//         console.log(`Flag Captured from ${previousHolder} by ${currentHolder}`)
//     })
// }

window.app = {
    initContract,
    callIcrement,
    // log,
    getNumber
}
