import { readContract } from "@wagmi/core";
import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS } from "../contractInformation";

export const getOrder = async(orderNum) => {
    const data = await readContract({
        address: QUICKER_ADDRESS,
        abi: QUICKER_CONTRACT_ABI,
        functionName: "getOrder",
        args: [orderNum],
      })
      return TemplateOrder(data)
  }

  const TemplateOrder = (data) => {
    let obj = {orderNum: BigInt(data[0]._hex).toString(),
    client: JSON.stringify(data[1]),
    quicker: JSON.stringify(data[2]),
    state: ConvertStateData(data[3]),
    orderPrice: ConvertCostData(data[4]),
    securityDeposit: ConvertCostData(data[5]),
    limitedTime: ConvertDateData(data[6]),
    createdTime: ConvertDateData(data[7]),
    matchedTime: ConvertDateData(data[8]),
    deliveredTime: ConvertDateData(data[9]),
    completedTime: ConvertDateData(data[10]),}
    return obj
  };

  const ConvertStateData = (state) => {
    const stateArr = ["created", "matched", "completed", "failed", "canceled"];
  
    const result = stateArr[state];
    return result;
  };
  
  const ConvertCostData = (cost) => {
    let result
    if (cost == 0) {
      result = null
    } else {
      result = BigInt(cost._hex).toLocaleString() + '원';
    }
    return result;
  };
  
  const ConvertDateData = (timestamp) => {
    if (timestamp == 0) {
      return null
    } else {
      const { year, month, day, hours, minutes } = getDateFromTimestamp(timestamp)
      const result = {
        year,
        month,
        day,
        hours,
        minutes
      }
      return (result)
    }
  }

  export const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear().toString().substr(2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return { year, month, day, hours, minutes };
  };