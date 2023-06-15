import { useEffect } from "react";
import { KlipSdk } from "../utils/KlipSdk";
import { useUserInfo } from "../App";
import klipIcon from "../images/klip_docs_icon.png";

import SideBar from "./SideBar";

const klipSdk = new KlipSdk();

export default function Header() {
  const { address, setAddress } = useUserInfo();

  const formatAddress = (address: string) => {
    const pre = address.slice(0, 4);
    const post = address.slice(-4);
    const middle = "...";
    return `${pre}${middle}${post}`;
  };

  const disconnectAddress = () => {
    if(window.confirm("지갑 연결을 해제하시겠습니까?")) {
        setAddress(null)
    localStorage.setItem("klip_address", JSON.stringify(null));
    }
  }

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
    if (storedAddress === "null") {
        setAddress(null)
    } else {
        setAddress(storedAddress)
    }
    
  }, []);

  return (
    <>
      <h1>Sentudy</h1>
      {address === null ? (
        <div onClick={async () => await getKlipAddress()}>
          <img
            src={klipIcon}
            alt="klip icon"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
          <span>Klip지갑연결하기</span>
        </div>
      ) : (
        <div onClick={() => {disconnectAddress()}}>{formatAddress(address)}</div>
      )}
      <hr
        style={{
          width: "100%",
          height: "1px",
          border: "none",
          borderBottom: "1px solid black",
          margin: "0",
        }}
      />
    </>
  );
}
