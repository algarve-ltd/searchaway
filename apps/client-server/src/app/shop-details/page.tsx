import ShopDetails from "@/components/pages/shops/shop-details";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.shopDetails.title,
  description: defaultPageMetadata.shopDetails.description,
  keywords: defaultPageMetadata.shopDetails.keywords,
  openGraph: {
    title: defaultPageMetadata.shopDetails.title,
    description: defaultPageMetadata.shopDetails.description,
    url: `${siteConfig.url}/shop-details`,
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
    title: defaultPageMetadata.shopDetails.title,
    description: defaultPageMetadata.shopDetails.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/shop-details`,
  },
};
const page = () => {
  return (
    <Wrapper>
      <ShopDetails />
    </Wrapper>
  )
}

export default page