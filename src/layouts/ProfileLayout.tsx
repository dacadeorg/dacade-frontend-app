import Wrapper from "@/components/sections/profile/Wrapper";
import DefaultLayout from "@/components/layout/Default";
import React, { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <DefaultLayout>
      <Wrapper>{children}</Wrapper>
    </DefaultLayout>
  );
}
