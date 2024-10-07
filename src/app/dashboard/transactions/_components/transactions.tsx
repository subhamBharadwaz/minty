"use client";

import { TransactionsTable } from "./transactions-table";
import { api } from "../../../../../convex/_generated/api";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { Loader2 } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";

export const Transactions = () => {
  const {
    data: transactions,
    isPending,
    error,
  } = useQuery(convexQuery(api.transactions.getAllTransactions, {}));

  const {
    mutate,
    isPending: deletePending,
    error: deleteError,
  } = useMutation({
    mutationFn: useConvexMutation(api.transactions.bulkDeleteTransactions),
  });

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
            <TransactionsTable
              onDelete={(row) => {
                const ids = row.map((r) => r.original._id);
                //@ts-ignore
                mutate({ ids });
              }}
              columns={columns}
              isPending={deletePending}
              //@ts-ignore
              data={transactions}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
