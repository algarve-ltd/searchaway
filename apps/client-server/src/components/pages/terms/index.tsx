import BreadCrumb from "@/components/common/BreadCrumb"
import FooterThree from "@/layouts/footers/FooterThree"
import HeaderThree from "@/layouts/headers/HeaderThree"
import TermsArea from "./TermsArea"

const Terms = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <BreadCrumb title="Terms and Conditions" sub_title="Terms and Conditions" />
            <TermsArea />
         </main>
         <FooterThree />
      </>
   )
}

export default Terms