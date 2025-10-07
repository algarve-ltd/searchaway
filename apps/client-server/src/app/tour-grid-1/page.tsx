import FeatureTwo from "@/components/features/feature-two";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig } from "@/config/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages & Adventures | SearchAway",
  description: "Discover amazing tour packages and adventure experiences with SearchAway. Browse our curated collection of tours, activities, and travel experiences worldwide.",
  keywords: "tour packages, adventure tours, travel experiences, guided tours, vacation packages, travel adventures, sightseeing tours, cultural tours, day tours, multi-day tours, group tours, private tours",
  openGraph: {
    title: "Tour Packages & Adventures | SearchAway",
    description: "Discover amazing tour packages and adventure experiences with SearchAway. Browse our curated collection of tours, activities, and travel experiences worldwide.",
    url: `${siteConfig.url}/tour-grid-1`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: "SearchAway Tour Packages"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages & Adventures | SearchAway",
    description: "Discover amazing tour packages and adventure experiences with SearchAway. Browse our curated collection of tours, activities, and travel experiences worldwide.",
    images: [siteConfig.defaultImage]
  }
};
const page = () => {
  return (
    <Wrapper>
      <FeatureTwo />
    </Wrapper>
  )
}

export default page