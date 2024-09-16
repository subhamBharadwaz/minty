"use client";

import { api } from "../../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryDialog } from "./category-dialog";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteCategory } from "./delete-category";

export const Categories = () => {
  const {
    data: categories,
    isPending,
    error,
  } = useQuery(convexQuery(api.categories.getAllCategories, {}));

  if (isPending) {
    return (
      <div className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="flex border px-2.5 w-[150px] h-16 border-muted items-center gap-x-2.5"
            >
              <Skeleton className="size-6" />
              <Skeleton className="h-3 w-16" />
            </Skeleton>
          ))}
      </div>
    );
  }

  if (categories?.length === 0) {
    return (
      <div className="flex gap-y-6 justify-center items-center flex-col">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          No categories added yet
        </h3>
        <p className="text-center text-muted-foreground text-base">
          Create a category to organize your transactions and track your
          spending
        </p>
        <CategoryDialog mode="add" />
      </div>
    );
  }

  return (
    <div>
      <div className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories?.map((category) => (
          <div
            className="flex hover:bg-muted/30 transition-all duration-200 border border-muted rounded-lg px-3.5 w-[170px] truncate h-14 items-center gap-x-2.5"
            key={category._id}
          >
            <p>{category.icon}</p>
            <p className="font-semibold capitalize text-md xl:text-lg">
              {category.name}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <EllipsisVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <CategoryDialog
                    category={category}
                    className="h-6 pl-0 w-full justify-start"
                    mode="edit"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <DeleteCategory id={category._id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>

      <CategoryDialog mode="add" />
    </div>
  );
};
