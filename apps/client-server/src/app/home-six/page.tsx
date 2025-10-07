import HomeSix from "@/components/homes/home-six";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.homeSix.title,
  description: defaultPageMetadata.homeSix.description,
  keywords: defaultPageMetadata.homeSix.keywords,
  openGraph: {
    title: defaultPageMetadata.homeSix.title,
    description: defaultPageMetadata.homeSix.description,
    url: `${siteConfig.url}/home-six`,
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
    title: defaultPageMetadata.homeSix.title,
    description: defaultPageMetadata.homeSix.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/home-six`,
  },
};

const page = () => {
  return (
    <Wrapper>
      <HomeSix />
    </Wrapper>
  )
}

export default page