import TeamDetails from "@/components/pages/teams/team-details";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultPageMetadata.teamDetails.title,
  description: defaultPageMetadata.teamDetails.description,
  keywords: defaultPageMetadata.teamDetails.keywords,
  openGraph: {
    title: defaultPageMetadata.teamDetails.title,
    description: defaultPageMetadata.teamDetails.description,
    url: `${siteConfig.url}/team-details`,
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
    title: defaultPageMetadata.teamDetails.title,
    description: defaultPageMetadata.teamDetails.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/team-details`,
  },
};

const page = () => {
  return (
    <Wrapper>
      <TeamDetails />
    </Wrapper>
  )
}

export default page