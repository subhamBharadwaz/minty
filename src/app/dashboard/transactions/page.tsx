import { Header } from "@/components/header";
import { AddTransactionDrawer } from "./_components/add-transaction-drawer";
import { Transactions } from "./_components/transactions";

export default function TransactionsPage() {
  return (
    <section className="container pb-8 pt-6 md:py-8">
      <Header
        title="Transactions"
        description="View, categorize, and manage all your transactions in one place."
      >
        <AddTransactionDrawer />
      </Header>
      <Transactions />
    </section>
  );
}
