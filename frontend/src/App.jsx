import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";
import About from "./pages/About";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <main className="overflow-hidden text-[#404040] bg-primary">
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/collection" element={<Collection/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/product/:productId" element={<Product/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/place-order" element={<PlaceOrder/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path="/verify" element={<Verify/>}></Route>
      </Routes>
    </main>
  )
}