import axios from "axios"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export default class InteractServer {

    constructor() {}

    //** cid값 리턴 */
    public storeToIpfs = async (data: JSON) => {
        try {
            const res = await axios.post(`${SERVER_URL}store`, data)
            return res.data
        } catch(e) {
            console.log(e)
            return null
        }        
    }

    //** 배열 리턴 */
    public getSentenceData = async (hash: string) => {
        const sendingHashData = { data: hash }
        try {
            const res = await axios.post(`${SERVER_URL}catchSentence`, sendingHashData)
            return res.data
        } catch(e) {
            console.log(e)
            return null
        }
    }

    //** json  */
    public getInfoData = async (hash: string) => {
        const sendingHashData = { data: hash }
        try {
            const res = await axios.post(`${SERVER_URL}catchInfo`, sendingHashData)
            return res.data
        } catch(e) {
            console.log(e)
            return null
        }
    }
}