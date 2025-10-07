import BlogDetails from "@/components/blogs/blog-details";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata, siteConfig } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...generatePageMetadata('blog', '/blog-details', {
    title: "Travel Article | SearchAway Blog",
    description: "Read our latest travel article with tips, guides, and insights to help you plan your perfect trip. Discover amazing destinations and travel experiences.",
    keywords: ["travel article", "travel guide", "destination tips", "travel blog", "travel advice", "vacation planning", "travel insights", "destination information", "travel inspiration", "travel stories"],
    type: 'article',
    publishedTime: new Date().toISOString(),
  }),
  authors: [{ name: siteConfig.author }],
};
const page = () => {
  return (
    <Wrapper>
      <BlogDetails />
    </Wrapper>
  )
}

export default page