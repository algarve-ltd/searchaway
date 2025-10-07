import Checkout from "@/components/pages/shops/checkout";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('checkout', '/checkout', {
  noindex: true, // Checkout pages should not be indexed for security/privacy
  nofollow: true // Also don't follow links from checkout for security
});
const page = () => {
  return (
    <Wrapper>
      <Checkout />
    </Wrapper>
  )
}

export default page