import StorySection from "./components/StorySection";
import Hero from "./components/Hero";
import About from "./components/About";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Products />
      <StorySection />
    </main>
  );
}
