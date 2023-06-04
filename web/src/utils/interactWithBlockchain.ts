import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { HELLO_ABI, HELLO_CONTRACT } from '../contractInformation';

export const getMessage =async () => {
  try {
    console.log("test")
    const data: any = await readContract({
      address: HELLO_CONTRACT,
      abi: HELLO_ABI,
      functionName: "viewMessage",
    }) 
    return data
  } catch(e) {
    console.log(e)
  }
}

export const updateMessage =async (message:string) => {
  try {
    const config = await prepareWriteContract({
      address: HELLO_CONTRACT,
      abi: HELLO_ABI,
      functionName: "update",
      args: [message],
    })
    const data = await writeContract(config)
    return data
  } catch (e) {
    console.log(e)
  }
}