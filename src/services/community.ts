import api from "@/config/api";
import axiosInstance from "@/config/axios";
import { Community } from "@/types/community";

export const fetchCommunities = async (): Promise<Community[]> => {
  const response = await axiosInstance.get("communities");
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
