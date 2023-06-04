import { useNavigate } from "react-router-dom"
import Header from "../components/Header"


export default function MainPage() {
    const navigate = useNavigate()
    return <>
    <Header />
    메인페이지
    <button onClick={() => navigate("/contents")}>컨텐츠 페이지 이동</button>
    </>
}