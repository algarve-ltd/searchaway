import HomeSeven from "@/components/homes/home-seven";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.homeSeven.title,
  description: defaultPageMetadata.homeSeven.description,
  keywords: defaultPageMetadata.homeSeven.keywords,
  openGraph: {
    title: defaultPageMetadata.homeSeven.title,
    description: defaultPageMetadata.homeSeven.description,
    url: `${siteConfig.url}/home-seven`,
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
    title: defaultPageMetadata.homeSeven.title,
    description: defaultPageMetadata.homeSeven.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/home-seven`,
  },
};

const page = () => {
  return (
    <Wrapper>
      <HomeSeven />
    </Wrapper>
  )
}

export default page