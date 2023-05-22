import ProfileWrapper from "@/components/sections/profile/Wrapper";
import DefaultLayout from "@/components/layout/Default";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <DefaultLayout>
      <ProfileWrapper>{children}</ProfileWrapper>
    </DefaultLayout>
  );
}
