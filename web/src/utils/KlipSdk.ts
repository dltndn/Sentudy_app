import {
  prepare,
  request as klipRequest,
  getResult as getKlipResult,
  //@ts-ignore
} from "klip-sdk";

const MAIN_URL = "http://localhost:3000/";
const APP_NAME = "Sentudy";

export class KlipSdk {
  constructor() {}

  public getAddress = async (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const response = await prepare.auth({
        bappName: APP_NAME,
        successLink: MAIN_URL,
        failLink: MAIN_URL,
      });
      resolve(await this.reqAndGetRes(response.request_key, 1))
    });
  };

  public sendKlay = async (
    from: string,
    to: string,
    amount: number
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const response = await prepare.sendToken({
        bappName: APP_NAME,
        from,
        to,
        amount: amount.toString(),
        contract: "0x0000000000000000000000000000000000000000",
        successLink: MAIN_URL,
        failLink: MAIN_URL,
      });
      resolve(await this.reqAndGetRes(response.request_key, 3))
    });
  };

  // caseNum -> 1: Auth요청, 2: Sign Message 요청, 3: 이외의 요청
  private reqAndGetRes = async (
    request_key: any,
    caseNum: number
  ): Promise<string> => {
    return new Promise(async (resolve) => {
      klipRequest(request_key);
      const timerId = setInterval(async () => {
        const data = await getKlipResult(request_key);
        if (data.status === "completed") {
          switch(caseNum) {
            case 1:
                resolve(data.result.klaytn_address)
                break;
            case 3:
                resolve(data.result.tx_hash)
                break;
          }
          return () => clearInterval(timerId);
        }
      }, 1000);
    });
  };
}
