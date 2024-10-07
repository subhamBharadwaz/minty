import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { EditCategoryDialog } from "./edit-category-dialog";
import { DeleteCategory } from "./delete-category";
import { Id } from "../../../../../convex/_generated/dataModel";
import { formatAmountInINR } from "@/lib/utils";

export const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="bg-muted rounded-full grid items-center p-3">
          {category?.icon}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
              <EditCategoryDialog
                defaultValues={{
                  name: category?.name,
                  icon: category?.icon,
                }}
                id={category?._id as Id<"categories">}
              />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteCategory id={category?._id as Id<"categories">} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-2 mt-4">
        <p className="capitalize font-semibold text-lg">{category?.name}</p>
        {category?.totalTransactions >= 1 ? (
          <p className="text-muted-foreground text-sm">
            {formatAmountInINR(category?.totalAmount)} from{" "}
            {category?.totalTransactions} transaction
            {category?.totalTransactions > 1 && `s`}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            No transactions added yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
