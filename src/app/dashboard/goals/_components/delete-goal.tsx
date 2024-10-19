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
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const DeleteGoal = ({ id }: { id: Id<"goals"> }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: useConvexMutation(api.goals.deleteGoal),
    onSuccess: () => setDialogOpen(false),
  });

  useEffect(() => {
    if (isPending) {
      setDialogOpen(true);
    }
    if (error) {
      setDialogOpen(false);
    }
  }, [isPending, error]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        //@ts-ignore
        description: error?.data,
        className: "bg-destructive text-white",
        duration: 5000,
      });
    }
  }, [error]);

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-2">
          <Trash2 className="size-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            goal.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
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
