import { styled } from "styled-components";
import { useState, useEffect, useMemo } from "react";
import InteractServer from "../utils/interactServer";

interface UnitProps {
  cid: String;
  index: number;
}
export const CommonUnit = ({ cid, index }: UnitProps) => {
  const [showData, setShowData] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const iServer = new InteractServer();

  const getData = async () => {
    const isShared = await getIsShared();
    const sentences = await getSentence();

    setShowData(true);
  };

  const getIsShared = async () => {
    // blockchain에서 공유 여부 가져오기
  };

  const getSentence = async () => {
    // ipfs에서 데이터 가져오기
  };

  useEffect(() => {
    if (showDetail) {
      getData();
    }
  }, [showDetail]);
  return (
    <>
      <CommonButton onClick={() => setShowDetail(true)}>
        {index + 1}
      </CommonButton>
      {showDetail ? (
        <CommonDetail>
          {showData ? <div>공부데이터</div> : <>블록체인에서 데이터 갖고오는 중</>}
        </CommonDetail>
      ) : (
        <></>
      )}
    </>
  );
};

export const AddUnit = () => {
  const addDataLogic = async () => {};

  return <AddButton>+</AddButton>;
};

const AddButton = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: orange;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  color: white;
  font-size: 3rem;
  cursor: pointer;
`;

const CommonButton = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #bf8c2d;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  color: white;
  font-size: 3rem;
  cursor: pointer;
`;

const CommonDetail = styled.div`
  width: 5em;
  height: 10em;
  border-radius: 5%;
  background-color: #d8c8aa;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;