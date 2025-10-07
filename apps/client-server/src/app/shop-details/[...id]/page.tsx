import BreadCrumb from "@/components/common/BreadCrumb";
import ShopDetails from "@/components/pages/shops/shop-details";
import ShopDetailsArea from "@/components/pages/shops/shop-details/ShopDetailsArea";
import ShopDetailsTabArea from "@/components/pages/shops/shop-details/ShopDetailsTabArea";
import shop_data from "@/data/ShopData";
import FooterSix from "@/layouts/footers/FooterSix";
import HeaderThree from "@/layouts/headers/HeaderThree";
import Wrapper from "@/layouts/Wrapper";
import { siteConfig } from "@/config/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = shop_data.filter((items) => items.page === "shop_5");
  const single_product = product.find((item) => Number(item.id) === Number(id));

  const productTitle = single_product?.title || "Travel Product";
  const productPrice = single_product?.price || "";
  
  return {
    title: `${productTitle} | SearchAway Travel Shop`,
    description: `Shop for ${productTitle} at SearchAway. ${productPrice ? `Starting from ${productPrice}. ` : ""}High-quality travel gear and accessories for your next adventure.`,
    keywords: ["travel gear", "travel accessories", productTitle.toLowerCase(), "travel equipment", "online shopping"],
    openGraph: {
      title: `${productTitle} | SearchAway Travel Shop`,
      description: `Shop for ${productTitle} at SearchAway. High-quality travel gear and accessories for your next adventure.`,
      url: `${siteConfig.url}/shop-details/${id}`,
      siteName: siteConfig.name,
      images: [
        {
          url: typeof single_product?.thumb === 'string' ? single_product.thumb : single_product?.thumb?.src || siteConfig.defaultImage,
          width: 1200,
          height: 630,
          alt: productTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productTitle} | SearchAway Travel Shop`,
      description: `Shop for ${productTitle} at SearchAway. High-quality travel gear and accessories.`,
      images: [typeof single_product?.thumb === 'string' ? single_product.thumb : single_product?.thumb?.src || siteConfig.defaultImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteConfig.url}/shop-details/${id}`,
    },
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = shop_data.filter((items) => items.page === "shop_5");
  const single_product = product.find((item) => Number(item.id) === Number(id));

  return (
    <Wrapper>
      <HeaderThree />
      <main>
        <BreadCrumb title="Shop Details" sub_title="Bluetooth Headphone" />
        <ShopDetailsArea single_product={single_product} />
        <ShopDetailsTabArea />
      </main>
      <FooterSix />
      <ShopDetails />
    </Wrapper>
  )
}

export default page