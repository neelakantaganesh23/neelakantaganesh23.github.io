import { About } from "@/components/about";
import { ContactFooter } from "@/components/contact-footer";
import { Credentials } from "@/components/credentials";
import { Hero } from "@/components/hero";
import { NavBar } from "@/components/nav-bar";
import { Playground } from "@/components/playground";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Work />
        <About />
        <Playground />
        <Credentials />
      </main>
      <ContactFooter />
    </>
  );
}
