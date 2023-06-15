import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export default function MainPage() {
  return (
    <>
      <Header />
      공유 컨텐츠 조회 페이지
      <SideBar />
    </>
  );
}
