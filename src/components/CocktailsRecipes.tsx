import { recipes } from "../data/receipes";
import { Accordion } from "./shared/Accordion";

export const CocktailsRecipes = () => {
  return (
    <section
      id="fourth-section"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <Accordion subtitle="Cocktails & recipes" data={recipes} number="04" />
    </section>
  );
};
