import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const ChartSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton
      className={cn(
        "w-full h-96  flex flex-col gap-y-6 rounded-xl border p-6",
        className,
      )}
    >
      <Skeleton className="w-14 h-4 rounded-md" />
      <Skeleton className=" w-[80%] h-[70%] rounded-md " />
    </Skeleton>
  );
};
