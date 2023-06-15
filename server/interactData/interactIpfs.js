import { config } from "dotenv";
import axios from "axios";
import { Web3Storage, File } from "web3.storage";
import Caver from "caver-js";

// 저장할 JSON 파일 이름
const FILE_NAME = "sentudyData.json";
const caver = new Caver(process.env.KLAYTN_BAOBAB_PROVIDER);
config();

class InteractIpfs {
  
  client;

  constructor() {
    console.log(process.env.WEB3STORAGE_API_KEY)
    this.client = new Web3Storage({
      token: process.env.WEB3STORAGE_API_KEY,
    });
  }

  // 1년 뒤 파일 사라짐
  //** jsonData: JSON */
  storeData = async (jsonData) => {
    const jsonContent = JSON.stringify(jsonData);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const file = new File([blob], FILE_NAME);

    const cid = await this.client.put([file]);
    console.log("Stored files with CID:", cid);
    return cid;
  };

  //** hash: string */
  getData = async (cid) => {
    // try {
    //   const result = await this.client.get(await cid);
    //   console.log(result);
    // } catch (e) {
    //   console.log(e);
    // }
    try {
      const response = await axios.get(
        `https://${cid}.ipfs.w3s.link/${FILE_NAME}`
      );
    //   console.log(response.data.data);
      return response.data.data
    } catch (e) {
      console.error("Error:", e);
    }
    return null
  };
}

export default InteractIpfs;