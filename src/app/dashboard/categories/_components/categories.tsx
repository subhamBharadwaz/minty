"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { NewCategory } from "./new-category";

export const Categories = () => {
  const categories = useQuery(api.categories.getAllCategories);

  if (categories === undefined) {
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

  if (categories.length === 0) {
    return (
      <div>
        <NewCategory />
      </div>
    );
  }

  return (
    <div className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories?.map((category) => (
        <div
          className="flex hover:bg-muted transition-all duration-200 border border-muted rounded-lg px-3.5 w-[170px] truncate h-14 items-center gap-x-2.5"
          key={category._id}
        >
          <p>{category.icon}</p>
          <p className="font-semibold capitalize text-md xl:text-lg">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};
