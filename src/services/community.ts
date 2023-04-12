import api from "@/config/api";
import axiosInstance from "@/config/axios";
import { Community } from "@/types/community";

export const fetchCommunities = async ({
  locale,
}: {
  locale: string;
}): Promise<Community[]> => {
  const response = await api(locale).server.get("communities");
  // const response = await axiosInstance.get('communities');
  return response.data;
};
