import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataGrid } from "./_components/data-grid";

export default async function DashbaordPage() {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  return (
    <section>
      <div className="" />

      <div className="space-y-10 container">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold lg:text-2xl">
            Welcome Back, {user?.firstName?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground max-w-[300px] text-sm">
            Monitor your budget, expenses, and income at a glance.
          </p>
        </div>
        <DataGrid />
      </div>
    </section>
  );
}
