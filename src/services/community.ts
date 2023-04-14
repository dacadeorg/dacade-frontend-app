import api from "@/config/api";
import { Community } from "@/types/community";

export const fetchCommunities = async ({
  locale,
}: {
  locale: string;
}): Promise<Community[]> => {
  const response = await api(locale).server.get("communities");
  return response.data;
};

export const fetchCommunity = async ({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}): Promise<Community> => {
  const response = await api(locale).server.get(
    `communities/${slug}`
  );
  return response.data;
};
