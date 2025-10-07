import FeatureFour from "@/components/features/feature-four";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig } from "@/config/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destination Map & Locations | SearchAway",
  description: "Explore destinations on our interactive map. Find tours, hotels, and attractions by location. Discover amazing places to visit and plan your perfect trip with SearchAway.",
  keywords: "destination map, travel locations, interactive map, travel destinations, places to visit, location-based travel, travel map, destination finder, location search, geographic travel",
  openGraph: {
    title: "Destination Map & Locations | SearchAway",
    description: "Explore destinations on our interactive map. Find tours, hotels, and attractions by location. Discover amazing places to visit and plan your perfect trip with SearchAway.",
    url: `${siteConfig.url}/map-listing`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: "SearchAway Destination Map"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Destination Map & Locations | SearchAway",
    description: "Explore destinations on our interactive map. Find tours, hotels, and attractions by location. Discover amazing places to visit and plan your perfect trip with SearchAway.",
    images: [siteConfig.defaultImage]
  }
};
const page = () => {
  return (
    <Wrapper>
      <FeatureFour />
    </Wrapper>
  )
}

export default page