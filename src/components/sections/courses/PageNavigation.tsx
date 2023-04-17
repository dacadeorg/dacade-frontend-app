import Section from "@/components/ui/Section";
import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface PageNavigationProps {
  show?: boolean;
}

export default function PageNavigation({
  show,
}: PageNavigationProps) {
  const colors = useSelector((state) => state.ui.colors);

  const { t } = useTranslation();

  const menus = useSelector((state) => state.menus);

  const router = useRouter();

  const [expanded, setexpanded] = useState(true);

  const list = menus.map((menu) => menu.items).flat();

  const currentIndex = list.findIndex(
    (el) =>
      stripTrailingSlash(el.link) ===
      stripTrailingSlash(router.asPath)
  );

  const prevUrl = useMemo(() => {
    const index = currentIndex - 1;
    if (index >= 0 && list[index]?.link) {
      return list[index].link;
    }
    return null;
  }, [currentIndex, list]);

  const nextUrl = useMemo(() => {
    const index = currentIndex + 1;
    if (index < list.length - 1 && list[index]?.link) {
      return list[index].link;
    }
    return null;
  }, [currentIndex, list]);

  const buttonStyle = {
    color: colors.textAccent,
    backgroundColor: "transparent",
  };

  const activeButtonStyle = {
    color: colors.text,
    backgroundColor: colors.textAccent,
  };

  const stripTrailingSlash = (str: string) => {
    let value = str;
    if (str.includes("#")) {
      value = value.split("#")[0];
    }
    return value.endsWith("/") ? value.slice(0, -1) : value;
  };

  return show ? (
    <Section>
      <div
        className={classNames(
          "text-center justify-center space-x-10 pt-3",
          { flex: prevUrl, "w-full sm:flex": !prevUrl }
        )}
      >
        {prevUrl && (
          <Link href={prevUrl}>
            <ArrowButton
              customStyle={buttonStyle}
              direction="left"
              min-width-class="null"
            >
              {t("nav.page.prev")}
            </ArrowButton>
          </Link>
        )}
        {nextUrl && (
          <Link href={nextUrl}>
            <ArrowButton
              className={classNames({
                "text-.5xl py-4.5 pl-6 pr-5.5": !prevUrl,
              })}
              min-width-class="prevUrl ? 'min-w-28' : 'min-w-3/4 sm:min-w-64'"
              customStyle={activeButtonStyle}
            >
              {!prevUrl
                ? t("navigation.start")
                : t("navigation.next")}
            </ArrowButton>
          </Link>
        )}
      </div>
    </Section>
  ) : null;
}
