import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KlipSdk } from "./utils/KlipSdk";
import { MainPage } from "./pages/MainPage";
import { create } from 'zustand'
import { UseUserInfoType } from "./InterfaceComp";

export const useUserInfo = create<UseUserInfoType>((set) => ({
  address: null,
  setAddress: (address: string) => set({address}),
}))

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


