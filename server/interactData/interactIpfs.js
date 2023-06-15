import { config } from "dotenv";
import axios from "axios";
import { Web3Storage, File } from "web3.storage";
import Caver from "caver-js";

// 저장할 JSON 파일 이름
const SENTENCE_FILE_NAME = "sentenceData.json";
const INFO_FILE_NAME = "infoData.json";
const caver = new Caver(process.env.KLAYTN_BAOBAB_PROVIDER);
config();

class InteractIpfs {
  client;

  constructor() {
    console.log(process.env.WEB3STORAGE_API_KEY);
    this.client = new Web3Storage({
      token: process.env.WEB3STORAGE_API_KEY,
    });
  }

  // 1년 뒤 파일 사라짐
  //** jsonData: JSON */
  storeData = async (jsonData) => {
    const files = [
      jsonToFile(jsonData.sentence, SENTENCE_FILE_NAME),
      jsonToFile(jsonData.information, INFO_FILE_NAME),
    ];
    const cid = await this.client.put(files);
    console.log("Stored files with CID:", cid);
    return cid;
  };

  //** hash: string */
  getSentnceData = async (cid) => {
    try {
      const response = await axios.get(
        `https://${cid}.ipfs.w3s.link/${SENTENCE_FILE_NAME}`
      );
      return response.data
    } catch (e) {
      console.error("Error:", e);
    }
    return null;
  };

  //** hash: string */
  getInfoData = async (cid) => {
    try {
      const response = await axios.get(
        `https://${cid}.ipfs.w3s.link/${INFO_FILE_NAME}`
      );
      if (response.data === null)
        return null
      return response.data
    } catch (e) {
      console.error("Error:", e);
    }
    return null;
  };
}

export default InteractIpfs;

const jsonToFile = (jsonData, fileName) => {
  const jsonContent = JSON.stringify(jsonData);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const file = new File([blob], fileName);
  return file;
};
