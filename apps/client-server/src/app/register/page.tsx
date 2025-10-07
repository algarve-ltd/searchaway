import Register from "@/components/pages/register";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('register', '/register', {
  noindex: true, // Don't index registration pages for privacy
  nofollow: false // But allow following links
});

const page = () => {
  return (
    <Wrapper>
      <Register />
    </Wrapper>
  )
}

export default page