import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Budget, Category } from "@/types";
import { EditCategoryDialog } from "./edit-category-dialog";
import { DeleteCategory } from "./delete-category";

export const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <EditCategoryDialog
          defaultValues={{
            name: category?.name,
            icon: category?.icon,
          }}
          id={category?._id}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
            ></DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteCategory id={category?._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};
