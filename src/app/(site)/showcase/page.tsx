import { ImageScroller } from "@/components/ImageScroller";

export const metadata = {
  title: "Interactive Image Scroller | Sudan Creative Hub",
  description: "Framer Scroll Image Gallery component demo for Sudan Creative Hub.",
};

export default function ShowcasePage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#030617" }}>
      <ImageScroller />
    </main>
  );
}
