"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatAmountInINR } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

const cardVariant = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      success: "bg-primary/20",
      danger: "bg-destructive/20",
      blue: "bg-blue-500/20",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      success: "text-primary",
      danger: "text-destructive",
      blue: "text-blue-500",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

type CardVariants = VariantProps<typeof cardVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends CardVariants, IconVariants {
  icon: LucideIcon;
  title: string;
  value?: number;
  dateRange?: string;
}

export const DataCard: FC<DataCardProps> = ({
  icon: Icon,
  title,
  value = 0,
  variant,
  dateRange,
}) => {
  return (
    <Card className="">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="space-y-2.5">
          <CardTitle className="lg:text-xl">{title}</CardTitle>
          <CardDescription>{dateRange}</CardDescription>
        </div>
        <div className={cn(cardVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>

      <CardContent>
        <span className="text-lg lg:text-xl  font-bold">
          {" "}
          {formatAmountInINR(value)}
        </span>
      </CardContent>
    </Card>
  );
};
