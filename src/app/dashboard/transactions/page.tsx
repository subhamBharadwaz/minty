import { AddTransactionDrawer } from "./_components/add-transaction-drawer";
import { TransactionDrawer } from "./_components/transaction-drawer";
import { Transactions } from "./_components/transactions";

export default function TransactionsPage() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Transactions
        </h3>
        <AddTransactionDrawer />
      </div>

      <Transactions />
    </section>
  );
}
