import Cart from "@/components/pages/shops/cart";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('cart', '/cart', {
  noindex: true, // Cart pages should not be indexed for privacy/security
  nofollow: false // But allow following links
});
const page = () => {
  return (
    <Wrapper>
      <Cart />
    </Wrapper>
  )
}

export default page