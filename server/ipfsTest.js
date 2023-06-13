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

import { config } from "dotenv";
import axios from "axios";
import { Web3Storage, File } from "web3.storage";
config();

// 저장할 JSON 파일 이름
const fileName = 'sentudyData.json'

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_API_KEY });
}

// 1년 뒤 파일 사라짐
async function storeFiles() {
  const client = makeStorageClient();
  const jsonContent = JSON.stringify(mockData);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const file = new File([blob], fileName);

  const cid = await client.put([file]);
  console.log("Stored files with CID:", cid);
  return cid;
}

const getData = async (cid) => {
  const client = makeStorageClient();
  const result = await client.get(cid);
  console.log(result)
  if (!result.ok) {
    throw new Error(`failed to get data`);
  }

  try {
    const response = await axios.get(
      `https://${cid}.ipfs.w3s.link/${fileName}`
    );
    console.log(response.data.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

async function main() {
  const cid = await storeFiles();
  await getData(cid);
}

main();
