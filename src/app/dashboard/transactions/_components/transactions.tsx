"use client";

import { TransactionsTable } from "./transactions-table";
import { api } from "../../../../../convex/_generated/api";
import { columns } from "./columns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { Loader2 } from "lucide-react";

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
    <>
      {isPending ? (
        <Loader2 className="size-5 animate-spin mx-auto" />
      ) : transactions ? (
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
      ) : null}
    </>
  );
};
