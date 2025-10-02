"use client"
import "../styles/index.css";
import "../../public/assets/scss/main.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { SearchProvider } from "@/contexts/SearchContext";
import { Poppins, Outfit } from "next/font/google";

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
        <meta name="keywords" content="Tourex - Tour & Travel Booking React Next js Template" />
        <meta name="description" content="Tourex is a Modern Tour & Travel Booking React Next js Template. It is perfect for travel businesses of all kinds. Tourex boasts a unique and intuitive search function that is ideal for tour operators, adventure companies, and holiday booking websites alike, as well as hotel booking, plane ticket booking, car rental, and property rental. It’s easy and quick to launch a professional and cost-effective travel website." />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/* For IE  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.png" sizes="any" />
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

