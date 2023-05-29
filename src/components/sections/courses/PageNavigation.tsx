import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";
import { useTranslation } from "next-i18next";
import Section from "../communities/_partials/Section";

/**
 * PageNavigation component
 * @date 4/18/2023 - 12:23:30 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function PageNavigation(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();

  const { menus, show, colors } = useSelector((state) => ({
    menus: state.navigation.menus,
    show: state.navigation.showPageNavigation,
    colors: state.ui?.colors,
  }));

  const list = useMemo(() => menus?.map((menu) => menu?.items).flat(), [menus]);

  /**
   * A function that removes trailing slashes from a given string, and removes any hash (#) fragments from the end of the string.
   * @param {string} str - The input string that may contain a trailing slash and/or hash fragment.
   * @returns {string} - The input string with any trailing slashes and hash fragments removed.
   *
   * @returns {string}
   */
  const stripTrailingSlash = (str: string): string => {
    let value = str;
    if (str.includes("#")) {
      value = value.split("#")[0];
    }
    return value.endsWith("/") ? value.slice(0, -1) : value;
  };

  /**
   * Get the current index of the link in the menu list.
   * @date 4/20/2023 - 4:36:45 PM
   *
   * @type {number}
   */
  const currentIndex: number = useMemo(() => list?.findIndex((el) => stripTrailingSlash(el.link) === stripTrailingSlash(router.asPath)), [list, router.asPath]);

  /**
   * Get the previous url
   * @date 4/20/2023 - 4:42:51 PM
   *
   * @type {string | null}
   */
  const prevUrl: string | null = useMemo(() => {
    const index = currentIndex - 1;
    if (index >= 0 && list[index]?.link) {
      return list[index].link;
    }
    return null;
  }, [currentIndex, list]);

  /**
   * Get the next url basing from the current.
   * @date 4/20/2023 - 4:41:17 PM
   *
   * @type {string | null}
   */
  const nextUrl: string | null = useMemo(() => {
    const index = currentIndex + 1;
    if (index < list?.length - 1 && list[index]?.link) {
      return list[index].link;
    }
    return null;
  }, [currentIndex, list]);

  const buttonStyle = {
    color: colors?.textAccent,
    backgroundColor: "transparent",
  };

  const activeButtonStyle = {
    color: colors?.text,
    backgroundColor: colors?.textAccent,
  };

  if (show)
    return (
      <Section>
        <div className={classNames("text-center justify-center space-x-10 pt-3", { flex: prevUrl, "w-full sm:flex": !prevUrl })}>
          {prevUrl && (
            <Link href={prevUrl}>
              <ArrowButton customStyle={buttonStyle} direction="left" minWidthClass="null">
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
                minWidthClass={prevUrl ? "min-w-28" : "min-w-3/4 sm:min-w-64"}
                customStyle={activeButtonStyle}
              >
                {!prevUrl ? t("navigation.start") : t("navigation.next")}
              </ArrowButton>
            </Link>
          )}
        </div>
      </Section>
    );
  return <></>;
}
