import AchievementLinkField from "@/components/sections/profile/achievements/LinkField";
import AchievementViewItem from "@/components/sections/profile/achievements/ListItem";
import i18Translate from "@/utilities/I18Translate";
import { GetStaticProps } from "next";
import React from "react";

const Profile = () => {
  return (
    <div>
      <AchievementLinkField link="https://www.google.com" />
      <AchievementViewItem />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => i18Translate(locale as string);

export default Profile;
