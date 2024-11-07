import { Shell } from "@/components/shell";
import { Goals } from "./_components/goals";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function GoalsPage() {
  return (
    <Shell className="gap-4">
      <Header
        title="Goals"
        description="Set and track financial goals to stay motivated and achieve your savings targets."
      />
      <Separator />
      <Goals />
    </Shell>
  );
}
