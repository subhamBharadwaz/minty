import { Header } from "@/components/header";
import { AddTransactionDrawer } from "./_components/add-transaction-drawer";
import { Transactions } from "./_components/transactions";
import { Shell } from "@/components/shell";

export default function TransactionsPage() {
  return (
    <Shell className="gap-4">
      <Header
        title="Transactions"
        description="View, categorize, and manage all your transactions in one place."
      >
        <AddTransactionDrawer />
      </Header>
      <Transactions />
    </Shell>
  );
}
