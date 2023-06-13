import Caver from "caver-js"
const caver = new Caver('https://klaytn-baobab-rpc.allthatnode.com:8551/oS6wCshVKYMHo0uhmsY5Tube3WOwIn7Y')

const IpfsTest = () => {
    async function testFunction() {
        const version = await caver.rpc.klay.getClientVersion()
        console.log(version)
    }
    return <><button onClick={() => testFunction}>test</button></>       
}

export default IpfsTest