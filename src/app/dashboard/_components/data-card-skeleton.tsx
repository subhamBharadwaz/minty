import { Skeleton } from "@/components/ui/skeleton";

export const DataCardSkeleton = () => {
  return (
    <Skeleton className="w-full max-w-md rounded-xl border p-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-4">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-32 h-2" />
        </div>
        <Skeleton className=" rounded-md size-10 p-3" />
      </div>
      <Skeleton className="mt-10 w-14 h-6 rounded-md" />
    </Skeleton>
  );
};
