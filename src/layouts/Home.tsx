import { ReactElement, ReactNode } from "react";
import DefaultLayout from "@/components/layout/Default";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <DefaultLayout footerBackgroundColor>{children}</DefaultLayout>
  );
}
