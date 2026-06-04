import { CocktailsRecipes } from "./CocktailsRecipes";
import { Contact } from "./Contact";
import { Features } from "./Features";
import { Header } from "./Header";
import { HeroDecoration } from "./home/HeroDecoration";
import { Ingredients } from "./Ingredients";
import { Intro } from "./Intro";
import { ScrollIndicator } from "./ScrollIndicator";
import { useScroll } from "framer-motion";
import { Story } from "./Story";
import { ScrollProgressBar } from "./home/ScrollProgressBar";
import { Model } from "./Model";

export const Home = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative w-full overflow-x-hidden">
      <Model src="/models/bottle.obj" scrollProgress={scrollYProgress} />
      <div className="fixed inset-0 -z-20 bg-[url(/images/imgi_66_texture.jpg)] bg-cover bg-center" />
      <HeroDecoration />
      <Header />
      <div className="relative z-10 w-full">
        <Intro />
        <Features />
        <Ingredients />
        <Story />
        <CocktailsRecipes />
        <Contact />
      </div>
      <ScrollIndicator />
      <ScrollProgressBar />
    </div>
  );
};
