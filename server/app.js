const express = require('express')
require("dotenv").config()
const { providers, Wallet, utils, Contract } = require('ethers');

const API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = require('./contractInformation').QUICKER_ADDRESS()
const CONTRACT_ABI = require('./contractInformation').QUICKER_CONTRACT_ABI()

// polygon mumbai
const provider = new providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const signer = new Wallet(PRIVATE_KEY, provider)
const quickerContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

const app = express();
const port = 8001;

app.get("/test", async (req, res) => {
  const result = await quickerContract.getOrder("1")
  console.log(result)
  res.send(result)

});

app.get(`/userAddress/:address`, (req, res) => {

})



app.get("/test2", (req,res) => {
  // const sentence = `함수의 상위 스코프를 결정하는 방식으로, 함수를 어디서 선언하였는지에 따라 상위 스코프를 결정하는 것이다.`
  const sentence = `As the elements are added the size of array changes and at the runtime, the size of the array will be determined.`
  console.log("sen len: " + sentence.length)

  const encoder = new TextEncoder();
  const textToU8Arr = encoder.encode(sentence);     
  console.log('sentence to byte: ' + textToU8Arr)
  console.log('len: ' + textToU8Arr.length)

  const decoder = new TextDecoder();
  const u8arr = new Uint8Array(textToU8Arr);
  console.log("byte to sentence: " + decoder.decode(u8arr));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




// // provider - Alchemy
// const alchemyProvider = new ethers.providers.AlchemyProvider(network=Network.MATIC_MUMBAI, API_KEY);

// // signer - you
// const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// // contract instance
// const quickerContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);