import { Shell } from "@/components/shell";
import { Budgets } from "./_components/budgets";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function BudgetsPage() {
  return (
    <Shell className="gap-4">
      <Header
        title="Budgets"
        description="Create and manage budgets to keep your spending on track and under control."
      />
      <Separator />
      <Budgets />
    </Shell>
  );
}
