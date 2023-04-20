import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import { useTranslation } from "next-i18next";
import Section from "../communities/_partials/Section";

/**
 * PageNavigation component interface
 * @date 4/18/2023 - 12:23:20 PM
 *
 * @interface PageNavigationProps
 * @typedef {PageNavigationProps}
 */
interface PageNavigationProps {
  show?: boolean;
}

/**
 * PageNavigation component
 * @date 4/18/2023 - 12:23:30 PM
 *
 * @export
 * @param {PageNavigationProps} {
  show,
}
 * @returns {ReactElement}
 */
export default function PageNavigation({
  show,
}: PageNavigationProps): ReactElement {
  const colors = useSelector((state) => state.ui?.colors);

  const { t } = useTranslation();

  const menus = useSelector((state) => state.communities?.list);

  const router = useRouter();

  const list = useMemo(
    () => menus?.map((menu) => menu?.items).flat(),
    [menus]
  );

  const currentIndex = useMemo(
    () =>
      list?.findIndex(
        (el) =>
          stripTrailingSlash(el.link) ===
          stripTrailingSlash(router.asPath)
      ),
    [list, router.asPath]
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
    if (index < list?.length - 1 && list[index]?.link) {
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
              minWidthClass="null"
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
              minWidthClass={`${
                prevUrl ? "min-w-28" : "min-w-3/4 sm:min-w-64"
              }`}
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
  ) : (
    <></>
  );
}
