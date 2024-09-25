"use client";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Category, Transaction } from "@/types";

type GroupedTransactions = {
  [key: string]: number;
};

function groupTransactionsByCategory(
  transactions: Transaction[],
  categories: Category[],
) {
  const grouped: GroupedTransactions = {};

  transactions?.forEach((transaction: Transaction) => {
    const category = categories.find((c) => c._id === transaction.categoryId);
    const categoryName = category?.name || "Unknown Category";
    const type = transaction?.type === "income" ? "Income" : "Expense"; // Identify transaction type
    const key = `${categoryName} (${type})`;

    if (!grouped[key]) {
      grouped[key] = 0;
    }
    grouped[key] += transaction?.amount;
  });

  const sortedCategories = Object.entries(grouped)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 4); // Top 4 categories

  return sortedCategories;
}

export const TopCategoriesChart = ({
  transactions,
  categories,
}: {
  transactions: Transaction[];
  categories: Category[];
}) => {
  const [chartData, setChartData] = useState<
    { fill: string; name: string; total: number }[]
  >([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  useEffect(() => {
    if (transactions && categories) {
      const topCategories = groupTransactionsByCategory(
        transactions,
        categories,
      );
      const colors = [
        "hsl(var(--chart-1))",

        "hsl(var(--chart-2))",

        "hsl(var(--chart-3))",

        "hsl(var(--chart-4))",
      ];

      const dynamicChartConfig: ChartConfig = {};
      const chartDataWithColors = topCategories.map((category, index) => {
        const color = colors[index % colors.length];
        dynamicChartConfig[category.name] = {
          label: category.name,
          color: color,
        };
        return { ...category, fill: color };
      });

      setChartConfig(dynamicChartConfig satisfies ChartConfig);
      setChartData(chartDataWithColors);
    }
  }, [transactions, categories]);

  return (
    <Card className="border-b py-5">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
