import { useEffect } from "react";
import { KlipSdk } from "../utils/KlipSdk";
import { useUserInfo } from "../App";

const klipIcon = require("../images/klip_docs_icon.png");
const klipSdk = new KlipSdk();

export default function Header() {
  const { address, setAddress } = useUserInfo();

  const getKlipAddress = async () => {
    try {
      const result = await klipSdk.getAddress();
      setAddress(result);
      localStorage.setItem("klip_address", result);
    } catch (e) {
      alert("지갑 연결에 실패하였습니다.");
    }
  };

  useEffect(() => {
    const storedAddress = localStorage.getItem("klip_address");
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  return (
    <>
      <h1>Sentudy</h1>
      {address === null ? (
        <div onClick={async () => await getKlipAddress()}>
          <img src={klipIcon} alt="klip icon" style={{ "width": "1.5rem", "height": "1.5rem" }}/>
          <span>Klip지갑연결하기</span>
        </div>
      ) : (
        <>{address}</>
      )}
    </>
  );
}
