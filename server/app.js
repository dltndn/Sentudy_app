import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import InteractIpfs from './interactData/interactIpfs.js';
// require("dotenv").config()
// const { providers, Wallet, utils, Contract } = require('ethers');


// const API_KEY = process.env.ALCHEMY_API_KEY;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = require('./contractInformation').QUICKER_ADDRESS()
// const CONTRACT_ABI = require('./contractInformation').QUICKER_CONTRACT_ABI()

const app = express();
const port = 8001;

app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

const iIpfs = new InteractIpfs()

app.use(cors())

app.get("/", (req, res) => {
  res.send("completed")
})

app.post("/store", async (req, res) => {
  // json data from client 
  const jsonData = req.body;
  const hash = await iIpfs.storeData(jsonData)
  res.send(hash)
})

app.post("/catch", async (req, res) => {
  // hash data from client 
  const hash = req.body
  const jsonData = await iIpfs.getData(hash.data)
  res.json(jsonData)
})

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