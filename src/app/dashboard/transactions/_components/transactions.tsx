"use client";

import { useQuery } from "convex/react";
import { TransactionsTable } from "./transactions-table";
import { api } from "../../../../../convex/_generated/api";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Transactions = () => {
  const transactions = useQuery(api.transactions.getAllTransactions);

  return (
    <Card className="max-w-screen-2xl mt-12  mx-auto">
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions ? (
          <div>
            <TransactionsTable columns={columns} data={transactions} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
