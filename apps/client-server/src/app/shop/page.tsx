import Shop from "@/components/pages/shops/shop";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.shop.title,
  description: defaultPageMetadata.shop.description,
  keywords: defaultPageMetadata.shop.keywords,
  openGraph: {
    title: defaultPageMetadata.shop.title,
    description: defaultPageMetadata.shop.description,
    url: `${siteConfig.url}/shop`,
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
    title: defaultPageMetadata.shop.title,
    description: defaultPageMetadata.shop.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/shop`,
  },
};
const page = () => {
  return (
    <Wrapper>
      <Shop />
    </Wrapper>
  )
}

export default page