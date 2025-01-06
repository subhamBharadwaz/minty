import type { Metadata } from "next";
import { UserProfile } from "@clerk/nextjs";

import { Header } from "@/components/header";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
};

const UserProfilePage = () => (
  <Shell className="gap-4">
    <Header title="Account" description="Manage Your Profile" size="sm" />
    <div className="w-full overflow-hidden rounded-lg">
      <UserProfile
        appearance={{
          variables: {
            borderRadius: "0.25rem",
          },
          elements: {
            card: "shadow-none",
            navbar: "hidden",
            navbarMobileMenuButton: "hidden",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
          },
        }}
        path="/dashboard/settings/user-profile"
        routing="path"
      />
    </div>
  </Shell>
);

export default UserProfilePage;