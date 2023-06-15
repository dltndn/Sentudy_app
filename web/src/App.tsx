import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KlipSdk } from "./utils/KlipSdk";
import { create } from 'zustand'
import { UseUserInfoType } from "./InterfaceComp";

import MainPage from "./pages/MainPage";
import ContentsPage from "./pages/ContentsPage"
import Management from "./pages/ManagementPage";
import IpfsTest from "./components/IpfsTest";

export const useUserInfo = create<UseUserInfoType>((set) => ({
  address: null,
  setAddress: (address: string | null) => set({address}),
}))

export default function App() {
  const { address } = useUserInfo()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/contents" element={<ContentsPage />} />
          <Route path="/management" element={<Management />} />
          <Route path="/testIpfs" element={<IpfsTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


