import FeatureThree from "@/components/features/feature-three";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig } from "@/config/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Tours & Experiences | SearchAway",
  description: "Explore premium tours and exclusive travel experiences with SearchAway. Find luxury tours, cultural experiences, and unique adventures for your perfect getaway.",
  keywords: "premium tours, luxury travel, exclusive experiences, cultural tours, unique adventures, high-end travel, luxury tour packages, VIP experiences, bespoke tours, luxury destinations",
  openGraph: {
    title: "Premium Tours & Experiences | SearchAway",
    description: "Explore premium tours and exclusive travel experiences with SearchAway. Find luxury tours, cultural experiences, and unique adventures for your perfect getaway.",
    url: `${siteConfig.url}/tour-grid-2`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: "SearchAway Premium Tours"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Tours & Experiences | SearchAway",
    description: "Explore premium tours and exclusive travel experiences with SearchAway. Find luxury tours, cultural experiences, and unique adventures for your perfect getaway.",
    images: [siteConfig.defaultImage]
  }
};
const page = () => {
  return (
    <Wrapper>
      <FeatureThree />
    </Wrapper>
  )
}

export default page