import { Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { useEffect, useState } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backend_url = import.meta.env.VITE_BACKEND_URL
const currency = '$'

export default function App() {

  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <main>
      <ToastContainer />
      {
        token === '' ?
        (
          <Login setToken={setToken}/>
        ):
        (
          <div className="bg-primary text-[#404040]">
            <Header/>
            <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row mt-8 sm:mt-4">
              <Sidebar token={token} setToken={setToken}/>
              <Routes>
                <Route path="/" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token} currency={currency}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        )
      }
    </main>
  )
}
