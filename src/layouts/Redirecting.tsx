import Loader from "@/components/ui/Loader";
import Section from "@/components/ui/Section";
import useSafePush from "@/hooks/useSafePush";
import removeCourseFromLink from "@/utilities/removeCourseFromLink";
import Head from "next/head";
import { useEffect } from "react";

export const Redirecting = ({ router, finalPage = "" }: { router: any; finalPage?: string }) => {
  const { safePush } = useSafePush();
  useEffect(() => {
    const redirectUrl = removeCourseFromLink(router, finalPage);
    safePush(redirectUrl);
  }, []);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
      </Head>

      <Section className="h-[50vh] grid place-items-center">
        <Loader />
      </Section>
    </>
  );
};
