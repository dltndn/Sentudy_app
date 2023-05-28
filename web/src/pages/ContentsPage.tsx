import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

export default function MainPage() {
    const navigate = useNavigate()
    return <>
    <Header />
    컨텐츠 조회 페이지
    <button onClick={() => navigate("/")}>메인 페이지 이동</button>
    </>
}