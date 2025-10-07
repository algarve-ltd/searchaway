import Pricing from "@/components/pages/pricing";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";

export const metadata = {
  title: defaultPageMetadata.pricing.title,
  description: defaultPageMetadata.pricing.description,
  keywords: defaultPageMetadata.pricing.keywords.join(", "),
  openGraph: {
    title: defaultPageMetadata.pricing.title,
    description: defaultPageMetadata.pricing.description,
    url: `${siteConfig.url}/pricing`,
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
    title: defaultPageMetadata.pricing.title,
    description: defaultPageMetadata.pricing.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
};
const page = () => {
  return (
    <Wrapper>
      <Pricing />
    </Wrapper>
  )
}

export default page