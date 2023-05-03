import api from "@/config/api";
import { Community } from "@/types/community";

export const fetchCommunities = async ({
  locale,
}: {
  locale: string;
}): Promise<Community[]> => {
  const { data } = await api(locale).server.get("communities");
  return data;
};

export const fetchCommunity = async ({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}): Promise<Community> => {
  const { data } = await api(locale).server.get(
    `communities/${slug}`
  );
  return data;
};
