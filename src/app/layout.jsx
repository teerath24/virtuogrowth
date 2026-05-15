import Script from "next/script";
import { ThemeProvider } from "../components/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "VirtuoGrowth Partners | Virtual Assistants & Web Design",
    template: "%s | VirtuoGrowth Partners",
  },
  description:
    "Connect your business with pre-vetted Virtual Assistants, Web Designers, and Web Developers. Fully vetted, expertly matched, seamlessly integrated. Starting at $900/month.",
  keywords: [
    "virtual assistant agency",
    "remote talent",
    "web design agency",
    "hire virtual assistant",
    "web development",
  ],
  metadataBase: new URL("https://virtuogrowth.com"),
  openGraph: {
    type: "website",
    url: "https://virtuogrowth.com",
    siteName: "VirtuoGrowth Partners",
    title: "VirtuoGrowth Partners | Virtual Assistants & Web Design",
    description:
      "Connect your business with pre-vetted Virtual Assistants, Web Designers, and Web Developers. Starting at $900/month.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen w-full overflow-x-hidden">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('virtuo-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
