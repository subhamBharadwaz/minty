import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataGrid } from "./_components/data-grid";
import { Shell } from "@/components/shell";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default async function DashbaordPage() {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  return (
    <Shell className="gap-4">
      <Header
        title={` Welcome Back, ${user?.firstName?.split(" ")[0]} 👋`}
        description=" Monitor your budget, expenses, and income at a glance.
"
        size="sm"
      />
      <Separator />
      <DataGrid />
    </Shell>
  );
}
