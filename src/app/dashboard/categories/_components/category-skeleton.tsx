import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

export default function CategorySkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Button variant="ghost" size="icon" className="ml-auto" disabled>
          <EllipsisVertical className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 mt-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}
