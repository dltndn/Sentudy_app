const mockData = {
  data: [
    {
      word: "pseudonymous",
      korean: "익명을 쓰는",
      sentense:
        "The name is taken from the pseudonymous creator of Bitcoin, Satoshi Nakamoto.",
    },
    {
      word: "Denomination",
      korean: "액면가",
      sentense:
        "Sats, or “satoshis,” are the smallest denomination of bitcoin that is recorded on the Bitcoin blockchain.",
    },
    {
      word: "Mere fraction",
      korean: "겨우 일부분",
      sentense:
        "Bitcoin has risen in value to the point that mere fractions of BTC are enough to pay for many goods and services",
    },
    {
      word: "accrual",
      korean: "축적",
      sentense:
        "The hashtag #StackingSats is used on social media in reference to habitual accrual of satoshis.",
    },
    {
      word: "liquidity",
      korean: "유동성",
      sentense: "with a lot of liquidity in different channels.",
    },
    {
      word: "test",
      korean: "테스트",
      sentense: "test mockData",
    },
  ],
};

// import { config } from "dotenv";
// import axios from "axios";
// import { Web3Storage, File } from "web3.storage";
// config();

// // 저장할 JSON 파일 이름
// const fileName = 'sentudyData.json'

// function makeStorageClient() {
//   return new Web3Storage({ token: process.env.WEB3STORAGE_API_KEY });
// }

// // 1년 뒤 파일 사라짐
// async function storeFiles() {
//   const client = makeStorageClient();
//   const jsonContent = JSON.stringify(mockData);
//   const blob = new Blob([jsonContent], { type: "application/json" });
//   const file = new File([blob], fileName);

//   const cid = await client.put([file]);
//   console.log("Stored files with CID:", cid);
//   return cid;
// }

// const getData = async (cid) => {
//   const client = makeStorageClient();
//   const result = await client.get(cid);
//   console.log(result)
//   if (!result.ok) {
//     throw new Error(`failed to get data`);
//   }

//   try {
//     const response = await axios.get(
//       `https://${cid}.ipfs.w3s.link/${fileName}`
//     );
//     console.log(response.data.data);
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// };

import { config } from "dotenv";
import axios from "axios";
import { Web3Storage, File } from "web3.storage";
import Caver from "caver-js";

// 저장할 JSON 파일 이름
const FILE_NAME = "sentudyData.json";
const caver = new Caver(process.env.KLAYTN_BAOBAB_PROVIDER);
config();

export default class InteractIpfs {
  
  client;

  constructor() {
    console.log(process.env.WEB3STORAGE_API_KEY)
    this.client = new Web3Storage({
      token: process.env.WEB3STORAGE_API_KEY,
    });
  }

  // 1년 뒤 파일 사라짐
  storeData = async (jsonData) => {
    const jsonContent = JSON.stringify(jsonData);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const file = new File([blob], FILE_NAME);

    const cid = await this.client.put([file]);
    console.log("Stored files with CID:", cid);
    return this.getHashForCid(cid);
  };

  getData = async (hash) => {
    const cid = this.getCidFromHash(hash);
    try {
      const result = await this.client.get(await cid);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    try {
      const response = await axios.get(
        `https://${cid}.ipfs.w3s.link/${FILE_NAME}`
      );
      console.log(response.data.data);
      return response.data.data
    } catch (e) {
      console.error("Error:", e);
    }
    return null
  };

  //private
  getHashForCid = async (cid) => {
    return caver.ipfs.toHex(cid);
  };

  getCidFromHash = async (hash) => {
    return caver.ipfs.fromHex(hash);
  };
}
