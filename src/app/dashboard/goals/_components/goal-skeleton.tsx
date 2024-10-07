import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GoalSkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 w-24" /> {/* Skeleton for "Goal Overview" */}
        <Skeleton className="h-8 w-8 rounded-full" />{" "}
        {/* Skeleton for dropdown dots */}
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3 mt-4" />
        <Skeleton className="h-2 w-full mt-2" />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-16 mb-1" />{" "}
            {/* Skeleton for "Category" */}
            <Skeleton className="h-5 w-3/4 mt-1" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-1" />{" "}
            {/* Skeleton for "Target Date" */}
            <Skeleton className="h-5 w-3/4 mt-1" />
          </div>
          <div>
            <Skeleton className="h-4 w-28 mb-1" />{" "}
            {/* Skeleton for "Days Remaining" */}
            <Skeleton className="h-5 w-1/2 mt-1" />
          </div>
          <div>
            <Skeleton className="h-4 w-12 mb-1" /> {/* Skeleton for "Status" */}
            <Skeleton className="h-5 w-1/3 mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
