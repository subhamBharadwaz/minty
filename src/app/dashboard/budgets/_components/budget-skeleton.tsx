import { Skeleton } from "@/components/ui/skeleton";

export const BudgetSkeleton = () => {
  return (
    <Skeleton className="w-full max-w-md rounded-xl border">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <Skeleton className="w-12 h-2" />
        <div className="flex items-center justify-between sm:justify-end  gap-x-2">
          <div className="flex items-center gap-x-2">
            <Skeleton className=" rounded-full size-6 p-4" />
            <Skeleton className="w-8 h-2.5" />
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <Skeleton className="w-12 h-2.5" />
        <Skeleton className="mt-2 w-full h-2 rounded-lg" />
        <div className="mt-4 grid grid-cols-2 gap-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="col-span-2 flex justify-between items-center"
            >
              <div className="flex items-center space-x-2">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-2 w-[60px]" />
              </div>
              <Skeleton className="h-2 w-[60px]" />
            </div>
          ))}
        </div>
      </div>
    </Skeleton>
  );
};
