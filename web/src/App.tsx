import React from 'react';
import { WagmiConfig, createClient, configureChains, useAccount } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { Web3Modal, Web3NetworkSwitch } from "@web3modal/react";
import { Web3Button } from '@web3modal/react';
import { Buffer } from "buffer";
import { create } from 'zustand'

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const chains = [polygonMumbai]
const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY
const WC_PROJECT_ID = process.env.REACT_APP_WC_PROJECT_ID

const { provider } = configureChains(chains, [
  alchemyProvider({ apiKey: ALCHEMY_API_KEY ?? "" }),
]);

const connector = w3mConnectors({
  chains: chains,
  version: 2,
  projectId: WC_PROJECT_ID ?? ""
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connector,
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {

  return (
    <>
    <WagmiConfig client={wagmiClient}>
        <h1>sentudy</h1>
        <Web3NetworkSwitch />
        <Web3Button icon="hide" label="지갑연결" balance="hide" />
      </WagmiConfig>
      <Web3Modal projectId={WC_PROJECT_ID ?? ""} ethereumClient={ethereumClient} themeVariables={{
    '--w3m-font-family': 'Roboto, sans-serif',
    '--w3m-accent-color': '#eda951',
    "--w3m-button-border-radius": "60em",
    "--w3m-accent-fill-color":"#2a2c2e"
  }}/>
</>
  );
}

export default App;
