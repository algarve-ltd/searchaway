import HomeTwo from "@/components/homes/home-two";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.homeTwo.title,
  description: defaultPageMetadata.homeTwo.description,
  keywords: defaultPageMetadata.homeTwo.keywords,
  openGraph: {
    title: defaultPageMetadata.homeTwo.title,
    description: defaultPageMetadata.homeTwo.description,
    url: `${siteConfig.url}/home-two`,
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
    title: defaultPageMetadata.homeTwo.title,
    description: defaultPageMetadata.homeTwo.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/home-two`,
  },
};

const page = () => {
  return (
    <Wrapper>
      <HomeTwo />
    </Wrapper>
  )
}

export default page