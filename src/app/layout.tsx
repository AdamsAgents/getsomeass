import type { Metadata, Viewport } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Adam's Software Services | AI Products, Websites & Social Content",
  description: "A creative tech studio building AI-powered apps, websites, and social media content for businesses that want to stand out.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ff8f7a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
