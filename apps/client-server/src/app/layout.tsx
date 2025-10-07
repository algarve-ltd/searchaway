"use client"
import "../styles/index.css";
import "../../public/assets/scss/main.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { SearchProvider } from "@/contexts/SearchContext";
import { Poppins, Outfit } from "next/font/google";
import { siteConfig } from "@/config/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-33ZH3HTDVD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-33ZH3HTDVD');
            `,
          }}
        />
        
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Site Information */}
        <meta name="author" content={siteConfig.author} />
        <meta name="keywords" content={siteConfig.keywords.join(", ")} />
        <meta name="description" content={siteConfig.description} />
        
        {/* Note: Canonical URLs are handled per-page via Next.js metadata API */}
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:image" content={`${siteConfig.url}${siteConfig.defaultImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${siteConfig.name} - Travel & Tour Booking`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
        <meta name="twitter:creator" content={siteConfig.twitterHandle} />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={`${siteConfig.url}${siteConfig.defaultImage}`} />
        <meta name="twitter:image:alt" content={`${siteConfig.name} - Travel & Tour Booking`} />
        
        {/* Additional Social Media Meta Tags */}
        <meta property="fb:app_id" content="" />
        <meta name="pinterest-rich-pin" content="true" />
        <meta property="article:publisher" content={siteConfig.url} />
        <meta property="article:author" content={siteConfig.author} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#1a73e8" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": siteConfig.name,
              "description": siteConfig.description,
              "url": siteConfig.url,
              "logo": `${siteConfig.url}/assets/img/logo/logo.png`,
              "image": `${siteConfig.url}${siteConfig.defaultImage}`,
              "sameAs": [
                `https://twitter.com/${siteConfig.twitterHandle?.replace('@', '')}`,
                "https://facebook.com/searchaway",
                "https://instagram.com/searchaway"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "priceRange": "$$"
            }, null, 2)
          }}
        />
      </head>
      <body className={`${poppins.variable} ${outfit.variable}`} suppressHydrationWarning={true}>
        <Provider store={store}>
          <SearchProvider>
            {children}
          </SearchProvider>
        </Provider>
      </body>
    </html>
  )
}