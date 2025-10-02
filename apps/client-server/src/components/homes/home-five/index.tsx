import HeaderFive from "@/layouts/headers/HeaderFive"
import Hero from "./Hero"
import CtaTwo from "./CtaTwo"
import Listing from "./Listing"
import FooterFive from "@/layouts/footers/FooterFive"
import { SearchProvider } from "@/contexts/SearchContext"

const HomeFive = () => {
   return (
      <SearchProvider>
         <HeaderFive />
         <Hero />
         {/* <Location /> */}
         {/* <CtaThree /> */}
         {/* <Choose /> */}
         {/* <Counter /> */}
         <Listing />
         {/* <Ads /> */}
         {/* <Testimonial style={true} /> */}
         {/* <Blog /> */}
         <CtaTwo />
         <FooterFive />
      </SearchProvider>
   )
}

export default HomeFive
