import Team from "@/components/pages/teams/team";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig, defaultPageMetadata } from "@/config/seo";

export const metadata = {
  title: defaultPageMetadata.team.title,
  description: defaultPageMetadata.team.description,
  keywords: defaultPageMetadata.team.keywords.join(", "),
  openGraph: {
    title: defaultPageMetadata.team.title,
    description: defaultPageMetadata.team.description,
    url: `${siteConfig.url}/team`,
    siteName: siteConfig.name,
    images: [
      {
        url: "/assets/img/team/member.png",
        width: 1200,
        height: 630,
        alt: "SearchAway Travel Experts Team",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultPageMetadata.team.title,
    description: defaultPageMetadata.team.description,
    images: ["/assets/img/team/member.png"],
    creator: siteConfig.twitterHandle,
  },
};
const page = () => {
  return (
    <Wrapper>
      <Team />
    </Wrapper>
  )
}

export default page