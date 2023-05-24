import React from "react";
import { WagmiConfig, createClient, configureChains, useAccount } from "wagmi";
import { klaytn, Chain } from "wagmi/chains";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { Web3Modal, Web3NetworkSwitch } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import { Buffer } from "buffer";
import { create } from "zustand";
import { getMessage, updateMessage } from "./utils/interactWithBlockchain";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const baobabRpcUrls = `https://klaytn-baobab-rpc.allthatnode.com:8551/${process.env.REACT_APP_ALLTHATNODE}`

const klaytn_baobab = {
  id: 1001,
  name: "Klaytn",
  network: "klaytn_baobab",
  nativeCurrency: {
    decimals: 18,
    name: "Klaytn",
    symbol: "KLAY",
  },
  rpcUrls: {
    default: {
      http: ["https://api.baobab.klaytn.net:8651"],
    },
    public: {
      http: ["https://api.baobab.klaytn.net:8651"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "BaobabKlaytnScope",
      url: "https://baobab.scope.klaytn.com/",
    },
    default: {
      name: "BaobabKlaytnScope",
      url: "https://baobab.scope.klaytn.com/",
    },
  },
} as const satisfies Chain

// klatrn_baobab
const chains = [klaytn_baobab];
const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY;
const WC_PROJECT_ID = process.env.REACT_APP_WC_PROJECT_ID;

const { provider } = configureChains(chains, [
  w3mProvider({ projectId: WC_PROJECT_ID ?? ""}),
]);

const connector = w3mConnectors({
  chains: chains,
  version: 2,
  projectId: WC_PROJECT_ID ?? ""
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connector,
  provider: provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  const testFunc = async () => {
    // const result = await updateMessage("Klaytn, Please...");
    const result = await getMessage()
    console.log(result);
  };

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <h1>sentudy</h1>
        <button onClick={async () => await testFunc()}>test btn</button>
        <Web3NetworkSwitch />
        <Web3Button icon="hide" label="지갑연결" balance="hide" />
      </WagmiConfig>
      <Web3Modal
        projectId={WC_PROJECT_ID ?? ""}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "#eda951",
          "--w3m-button-border-radius": "60em",
          "--w3m-accent-fill-color": "#2a2c2e",
        }}
      />
    </>
  );
}

export default App;
