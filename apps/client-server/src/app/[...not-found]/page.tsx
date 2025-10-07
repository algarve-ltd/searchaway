import NotFound from "@/components/pages/error";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('notFound', '/404', {
  noindex: true, // Don't index 404 pages
  nofollow: true // Don't follow links from 404 pages
});

const page = () => {
   return (
      <Wrapper>
         <NotFound />
      </Wrapper>
   )
}

export default page