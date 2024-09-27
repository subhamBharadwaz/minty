"use client";

import { TransactionsTable } from "./transactions-table";
import { api } from "../../../../../convex/_generated/api";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { Loader2 } from "lucide-react";

export const Transactions = () => {
  const {
    data: transactions,
    isPending,
    error,
  } = useQuery(convexQuery(api.transactions.getAllTransactions, {}));

  console.log({ transactions });

  return (
    <Card className="max-w-screen-2xl mt-12  mx-auto">
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Loader2 className="size-5 animate-spin mx-auto" />
        ) : transactions ? (
          <div>
            <TransactionsTable columns={columns} data={transactions} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
