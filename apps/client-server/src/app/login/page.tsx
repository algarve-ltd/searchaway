import Login from "@/components/pages/login";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('login', '/login', {
  noindex: true, // Don't index login pages for privacy
  nofollow: false // But allow following links
});

const page = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  )
}

export default page