import FeatureDetailsTwo from "@/components/features/feature-details-two";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig } from "@/config/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive Tour Experience | SearchAway",
  description: "Experience our exclusive tour packages with detailed itineraries, expert guides, and premium services. Book your luxury travel experience with SearchAway today.",
  keywords: "exclusive tours, luxury travel experience, premium tour packages, expert guides, luxury itinerary, VIP tours, bespoke travel, private tours, luxury destinations",
  openGraph: {
    title: "Exclusive Tour Experience | SearchAway",
    description: "Experience our exclusive tour packages with detailed itineraries, expert guides, and premium services. Book your luxury travel experience with SearchAway today.",
    url: `${siteConfig.url}/tour-details-2`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: "SearchAway Exclusive Tours"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Tour Experience | SearchAway",
    description: "Experience our exclusive tour packages with detailed itineraries, expert guides, and premium services. Book your luxury travel experience with SearchAway today.",
    images: [siteConfig.defaultImage]
  }
};
const page = () => {
  return (
    <Wrapper>
      <FeatureDetailsTwo />
    </Wrapper>
  )
}

export default page