import About from "@/components/About";
import Hero from "../components/Hero";
import HowIBuild from "@/components/HowIBuild";
import Skills from "@/components/Skills";
import IndustryExperience from "@/components/IndustryExperience";
import Experience from "@/components/Experience";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Blogs from "@/components/Blogs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowIBuild />
      <Skills />
      <IndustryExperience />
      <Blogs />
      <Experience />
      <Banner />
      <Contact />
      <Footer />
    </>
  );
}