import Navbar from "@/components/Navbar";
import Image from "next/image";
import { prisma } from "@/utils/prisma";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}
