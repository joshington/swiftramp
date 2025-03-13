import Navbar from "@/components/Navbar";
import Image from "next/image";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";


export default function Dapp() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}