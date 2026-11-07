"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <LanguageProvider>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Products />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
