import BlogTwo from "@/components/blogs/blog-two/indesx";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${defaultPageMetadata.blog.title}`,
  description: defaultPageMetadata.blog.description,
  keywords: defaultPageMetadata.blog.keywords,
  openGraph: {
    title: `${defaultPageMetadata.blog.title}`,
    description: defaultPageMetadata.blog.description,
    url: `${siteConfig.url}/blog-standard`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${defaultPageMetadata.blog.title}`,
    description: defaultPageMetadata.blog.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/blog-standard`,
  },
};
const page = () => {
  return (
    <Wrapper>
      <BlogTwo />
    </Wrapper>
  )
}

export default page