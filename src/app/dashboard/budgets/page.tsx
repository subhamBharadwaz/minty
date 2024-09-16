import { Budgets } from "./_components/budgets";

export default function BudgetsPage() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Budgets
        </h3>
      </div>
      <Budgets />
    </section>
  );
}
