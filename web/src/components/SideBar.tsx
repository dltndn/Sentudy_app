import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const SideBar = () => {
  const nav = useNavigate();
  return (
    <>
    <SidebarContainer>
      <button onClick={() => nav("/")}>메인 페이지 이동</button>
      <button onClick={() => nav("/contents")}>컨텐츠 공유 페이지 이동</button>
      <button onClick={() => nav("/management")}>my 컨텐츠 관리 페이지 이동</button>
      </SidebarContainer>
    </>
  );
};

export default SideBar;

const SidebarContainer = styled.div`
  position: absolute;
  top: 7em;
  right: 0;
  width: 5em;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
`;
