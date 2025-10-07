import About from "@/components/pages/about";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('faq', '/faq');
const page = () => {
  return (
    <Wrapper>
      <About />
    </Wrapper>
  )
}

export default page