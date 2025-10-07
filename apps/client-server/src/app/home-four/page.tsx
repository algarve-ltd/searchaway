import HomeFour from "@/components/homes/home-four";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.homeFour.title,
  description: defaultPageMetadata.homeFour.description,
  keywords: defaultPageMetadata.homeFour.keywords,
  openGraph: {
    title: defaultPageMetadata.homeFour.title,
    description: defaultPageMetadata.homeFour.description,
    url: `${siteConfig.url}/home-four`,
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
    title: defaultPageMetadata.homeFour.title,
    description: defaultPageMetadata.homeFour.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/home-four`,
  },
};

const page = () => {
  return (
    <Wrapper>
      <HomeFour />
    </Wrapper>
  )
}

export default page