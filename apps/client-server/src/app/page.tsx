import HomeThree from "@/components/homes/home-three";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('home', '/');
const page = () => {
  return (
    <Wrapper>
      <HomeThree />
    </Wrapper>
  )
}

export default page