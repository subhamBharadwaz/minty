"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const DeleteTransaction = ({ id }: { id: Id<"transactions"> }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.transactions.deleteTransaction),
    onSuccess: () => setDialogOpen(false),
  });

  useEffect(() => {
    if (isPending) {
      setDialogOpen(true);
    }
  }, [isPending]);

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0 h-6">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="bg-destructive"
            onClick={() => mutate({ id })}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" /> Deleting
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
