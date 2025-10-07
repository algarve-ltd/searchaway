import HomeThree from "@/components/homes/home-three";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.homeThree.title,
  description: defaultPageMetadata.homeThree.description,
  keywords: defaultPageMetadata.homeThree.keywords,
  openGraph: {
    title: defaultPageMetadata.homeThree.title,
    description: defaultPageMetadata.homeThree.description,
    url: `${siteConfig.url}/home-three`,
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
    title: defaultPageMetadata.homeThree.title,
    description: defaultPageMetadata.homeThree.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/home-three`,
  },
};

const page = () => {
  return (
    <Wrapper>
      <HomeThree />
    </Wrapper>
  )
}

export default page