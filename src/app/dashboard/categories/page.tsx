import { Shell } from "@/components/shell";
import { Categories } from "./_components/categories";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function CategoriesPage() {
  return (
    <Shell className="gap-4">
      <Header
        title="Categories"
        description="Organize your expenses by category to get a clear view of where your money goes."
        size="sm"
      />
      <Separator />
      <Categories />
    </Shell>
  );
}
