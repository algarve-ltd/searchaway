"use client"
import Banner from "./Banner"
import dynamic from "next/dynamic"
import HeaderThree from "@/layouts/headers/HeaderThree"
import FooterThree from "@/layouts/footers/FooterThree"
import Cta from "../home-one/Cta"
const Listing = dynamic(() => import("./Listing"), { ssr: false });

const HomeThree = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <Banner />
            <Listing />
            {/* <CtaThree /> */}
            {/* <Location /> */}
            {/* <Blog /> */}
            <Cta />
         </main>
         <FooterThree />
      </>
   )
}

export default HomeThree
