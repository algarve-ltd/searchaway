import Wishlist from "@/components/pages/shops/wishlist";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('wishlist', '/wishlist', {
  noindex: true, // Wishlist pages are user-specific and shouldn't be indexed
  nofollow: false // But allow following links
});
const page = () => {
  return (
    <Wrapper>
      <Wishlist />
    </Wrapper>
  )
}

export default page