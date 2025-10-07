import Terms from "@/components/pages/terms";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";

export const metadata = {
  title: defaultPageMetadata.terms.title,
  description: defaultPageMetadata.terms.description,
  keywords: defaultPageMetadata.terms.keywords.join(", "),
  openGraph: {
    title: defaultPageMetadata.terms.title,
    description: defaultPageMetadata.terms.description,
    url: `${siteConfig.url}/terms-and-conditions`,
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
    title: defaultPageMetadata.terms.title,
    description: defaultPageMetadata.terms.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
};
const page = () => {
  return (
    <Wrapper>
      <Terms />
    </Wrapper>
  )
}

export default page