import FeatureDetailsOne from "@/components/features/feature-details-one";
import Wrapper from "@/layouts/Wrapper";
import { generatePageMetadata } from "@/config/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('tours', '/tour-details', {
  title: "Tour Details & Booking | SearchAway",
  description: "Discover detailed information about our amazing tours and book your perfect travel experience. View itineraries, pricing, and availability for your next adventure.",
  keywords: ["tour details", "tour booking", "travel itinerary", "tour information", "adventure booking", "travel planning", "tour schedule", "tour pricing", "tour availability", "book tour online"]
});
const page = () => {
  return (
    <Wrapper>
      <FeatureDetailsOne />
    </Wrapper>
  )
}

export default page