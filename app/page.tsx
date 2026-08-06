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
    <div className="grid grid-cols-1 gap-y-24 sm:gap-y-28 lg:gap-y-32">
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
    </div>
  );
}