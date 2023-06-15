import { useEffect, useState } from "react";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useUserInfo } from "../App";
import InteractServer from "../utils/interactServer";
import { CommonUnit, AddUnit } from "../components/Unit";

const Management = () => {
  const [cidArr, setCidArr] = useState<String[] | null | undefined>(null);
  const iServer = new InteractServer();

  const getCidArr = async () => {
    // 블록체인에서 cid 배열 불러오기
    const resArr = ["123", "456", "789"];
    setCidArr(resArr); // undefined -> 블록체인에 데이터가 없음
  };

  useEffect(() => {
    getCidArr();

    return () => {};
  }, []);

  return (
    <>
      <Header />내 컨텐츠 관리 페이지
      {cidArr !== null ? (
        <>
          {cidArr !== undefined ? (
            <>
              {cidArr.map((val, index) => (
                <CommonUnit cid={val} index={index} key={index}/>
              ))}
              <AddUnit />
            </>
          ) : (
            <AddUnit />
          )}
        </>
      ) : (
        <>로딩중...</>
      )}
      <SideBar />
    </>
  );
};

export default Management;
