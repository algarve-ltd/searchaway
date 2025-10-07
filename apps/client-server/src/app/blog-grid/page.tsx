import BlogOne from "@/components/blogs/blog-one";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('blog', '/blog-grid', {
  image: "/assets/img/blog/blog-1.jpg"
});
const page = () => {
  return (
    <Wrapper>
      <BlogOne />
    </Wrapper>
  )
}

export default page