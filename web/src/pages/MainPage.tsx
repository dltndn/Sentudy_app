import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import Header from "../components/Header"


export default function MainPage() {
    const navigate = useNavigate()
    const [ hash, setHash ] = useState<string>('')

    const getHash = async () => {
        const res = await axios.post('http://localhost:8001/store', mockData)
        console.log(res.data)
        console.log(typeof(res.data))
        setHash(res.data)
    }

    const getData = async () => {
        const sendingHashData = { data: hash }
        const res = await axios.post('http://localhost:8001/catchSentence', sendingHashData)
        console.log(res.data)
        console.log(typeof(res.data))
    }

    const getData2 = async () => {
        const sendingHashData = { data: hash }
        const res = await axios.post('http://localhost:8001/catchInfo', sendingHashData)
        console.log(res.data)
        console.log(typeof(res.data))
    }

    return <>
    <Header />
    메인페이지
    <button onClick={async () => await getHash()}>Get Hash</button>
    <button onClick={async () => await getData()}>Get Data</button>
    <button onClick={async () => await getData2()}>Get Data2</button>
    <button onClick={() => navigate("/contents")}>컨텐츠 페이지 이동</button>
    </>
}

const mockData = {
    sentence: [
      {
        word: "pseudonymous",
        korean: "익명을 쓰는",
        sentense:
          "The name is taken from the pseudonymous creator of Bitcoin, Satoshi Nakamoto.",
      },
      {
        word: "Denomination",
        korean: "액면가",
        sentense:
          "Sats, or “satoshis,” are the smallest denomination of bitcoin that is recorded on the Bitcoin blockchain.",
      },
      {
        word: "Mere fraction",
        korean: "겨우 일부분",
        sentense:
          "Bitcoin has risen in value to the point that mere fractions of BTC are enough to pay for many goods and services",
      },
      {
        word: "accrual",
        korean: "축적",
        sentense:
          "The hashtag #StackingSats is used on social media in reference to habitual accrual of satoshis.",
      },
      {
        word: "liquidity",
        korean: "유동성",
        sentense: "with a lot of liquidity in different channels.",
      },
      {
        word: "test",
        korean: "테스트",
        sentense: "test mockData",
      },
    ],
    information: null
  };