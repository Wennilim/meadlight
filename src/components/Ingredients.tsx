import { ingredients } from "../data/ingredients";
import { Carousel } from "./shared/Carousel";

export const Ingredients = () => {
  return (
    <section id="second-section" className="relative min-h-screen w-full">
      <Carousel
        subtitle="Organic"
        data={ingredients}
        number="02"
        align="right"
      />
    </section>
  );
};
