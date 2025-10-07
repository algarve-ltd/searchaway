import HomeFive from "@/components/homes/home-five";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.homeFive.title,
  description: defaultPageMetadata.homeFive.description,
  keywords: defaultPageMetadata.homeFive.keywords,
  openGraph: {
    title: defaultPageMetadata.homeFive.title,
    description: defaultPageMetadata.homeFive.description,
    url: `${siteConfig.url}/home-five`,
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
    title: defaultPageMetadata.homeFive.title,
    description: defaultPageMetadata.homeFive.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/home-five`,
  },
};

const page = () => {
  return (
    <Wrapper>
      <HomeFive />
    </Wrapper>
  )
}

export default page