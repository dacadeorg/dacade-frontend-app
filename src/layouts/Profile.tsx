import DefaultLayout from "@/components/layout/Default";
import ProfileWrapper from "@/components/sections/profile/Wrapper";
import React from "react";

export default function ProfileLayout({ children }: any) {
  return (
    <DefaultLayout footerBackgroundColor={"default"}>
      <ProfileWrapper>{children}</ProfileWrapper>
    </DefaultLayout>
  );
}
