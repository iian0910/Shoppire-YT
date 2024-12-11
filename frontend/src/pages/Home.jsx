import Hero from "../components/Hero";
import Footer from "../components/Footer";
import NewArrivals from "../components/NewArrivals";
import PopularProduct from "../components/PopularProduct";
import { Features } from "../components/Features";

export default function Home() {
  return (
    <>
      <Hero/>
      <NewArrivals />
      <PopularProduct />
      <Features />
      <Footer/>
    </>
  )
}