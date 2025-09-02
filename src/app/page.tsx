import About from "@/components/content/about";
import Contact from "@/components/content/contact";
import Experience from "@/components/content/experience";
import FeaturedProjects from "@/components/content/featuredProjects";
import Hero from "@/components/content/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <FeaturedProjects />
      <Contact />
    </main>
  );
}
