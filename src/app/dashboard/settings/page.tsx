import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { AppearanceForm } from "./_components/appearance-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// export const metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
//   title: "Settings",
//   description: "Manage account and website settings.",
// };

export default function SettingsPage() {
  return (
    <Shell className="gap-4">
      <Header
        title="Settings"
        description="Manage account and website settings."
        size="sm"
      />
      <Separator />
      <Tabs defaultValue="appearance" className="hidden w-full md:block">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the appearance of the app. Automatically switch
                between day and night themes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <AppearanceForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your profile information with clerk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/dashboard/settings/user-profile"
                className={cn(buttonVariants())}
              >
                Manage Profile
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mobile view */}
      <div className="space-y-10 md:hidden">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the appearance of the app. Automatically switch between
              day and night themes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <AppearanceForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Manage your profile information with clerk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/dashboard/settings/user-profile"
              className={cn(buttonVariants())}
            >
              Manage Profile
            </Link>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
