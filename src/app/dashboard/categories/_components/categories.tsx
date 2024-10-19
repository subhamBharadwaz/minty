"use client";

import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { AddCategoryDialog } from "./add-category-dialog";
import { CategoryCard } from "./category-card";
import CategorySkeleton from "./category-skeleton";

export const Categories = () => {
  const {
    data: categories,
    isPending,
    error,
  } = useQuery(convexQuery(api.categories.getAllCategories, {}));

  if (isPending) {
    return (
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <CategorySkeleton key={index} />
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

        <AddCategoryDialog />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <AddCategoryDialog className="ml-auto mr-0" />
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <CategoryCard category={category} key={category?._id} />
        ))}
      </div>
    </div>
  );
};
