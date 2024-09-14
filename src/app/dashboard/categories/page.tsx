import { Categories } from "./_components/categories";
import { NewCategory } from "./_components/new-category";

export default function CategoriesPage() {
  return (
    <section>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Categories
      </h3>
      <NewCategory />
      <Categories />
    </section>
  );
}
