import BreadCrumb from "@/components/common/BreadCrumb"
import FooterThree from "@/layouts/footers/FooterThree"
import HeaderThree from "@/layouts/headers/HeaderThree"
import AboutArea from "./AboutArea"

const About = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <BreadCrumb title="About Us" sub_title="About Us" />
            <AboutArea />
         </main>
         <FooterThree />
      </>
   )
}

export default About
