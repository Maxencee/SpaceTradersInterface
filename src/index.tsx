import ReactDOM from "react-dom/client";
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/main.css";

import Layout from "./pages/Layout.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);