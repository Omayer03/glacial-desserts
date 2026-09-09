import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogHero from "./CatalogHero";
import CatalogDownload from "./CatalogDownload";
import CatalogList from "./CatalogList";

export const metadata: Metadata = {
  title: "Our Catalog | Glacial Desserts",
  description:
    "Browse the complete Glacial Desserts range, or download the full catalogue PDF.",
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <CatalogHero />
      <CatalogDownload />
      <CatalogList />
      <Footer />
    </>
  );
}
