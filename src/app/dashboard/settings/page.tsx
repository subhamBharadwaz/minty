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
import { AppearanceForm } from "@/components/appearance-form";

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
      <Tabs defaultValue="account" className="hidden w-full md:block">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
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
      </Tabs>
    </Shell>
  );
}
