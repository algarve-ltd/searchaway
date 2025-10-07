import FeatureOne from "@/components/features/feature-one";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig } from "@/config/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotels & Accommodation Worldwide | SearchAway",
  description: "Find and book the perfect hotels and accommodation for your trip. Browse luxury resorts, boutique hotels, and budget-friendly stays in top destinations worldwide.",
  keywords: "hotels, accommodation, resorts, hotel booking, luxury hotels, budget hotels, vacation rentals, travel lodging, boutique hotels, hotel deals, online hotel booking, hotel reservations",
  openGraph: {
    title: "Hotels & Accommodation Worldwide | SearchAway",
    description: "Find and book the perfect hotels and accommodation for your trip. Browse luxury resorts, boutique hotels, and budget-friendly stays in top destinations worldwide.",
    url: `${siteConfig.url}/hotel-grid`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: "SearchAway Hotels & Accommodation"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotels & Accommodation Worldwide | SearchAway",
    description: "Find and book the perfect hotels and accommodation for your trip. Browse luxury resorts, boutique hotels, and budget-friendly stays in top destinations worldwide.",
    images: [siteConfig.defaultImage]
  }
};
const page = () => {
  return (
    <Wrapper>
      <FeatureOne />
    </Wrapper>
  )
}

export default page