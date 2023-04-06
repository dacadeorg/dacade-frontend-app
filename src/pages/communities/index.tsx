import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { getMetadataTitle } from "@/utilities/Metadata";
import { fetchAllCommunities } from "@/store/feature/community.slice";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useEffect } from "react";
import CommunityListCard from "@/components/cards/community/List";
import i18Translate from "@/utilities/I18Translate";
import Head from "next/head";

/**
 * Represents the Communities page.
 * TODO: This page will be wrapped with homepage wrapper.
 * @date 4/6/2023 - 11:55:48 AM
 *
 * @export
 */
export default function CommunitiesPage(){
  const { t } = useTranslation();
  const communities = useSelector((state) => state.communities.list);
  const dispatch = useDispatch();
  const title: string = getMetadataTitle(t("nav.communities"))

  useEffect(() => {
    dispatch(fetchAllCommunities());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <div className="flex flex-col justify-center content-wrapper">
        <h1 className="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">
          {t("nav.communities")}
        </h1>
        <div className="row w-full">
          {communities?.map((community,index) => (
            <div key={`generated-key-${index}`} className="flex pb-4 min-w-full flex-grow">
              <CommunityListCard community={community} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/**
 * Initialize the page transilation
 * @date 4/6/2023 - 11:52:05 AM
 *
 * @async
 */
export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);

