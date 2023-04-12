import axiosInstance from '@/config/axios';
import { Community } from '@/types/community';

export const fetchCommunities = async (): Promise<Community[]> => {
  const response = await axiosInstance.get('communities');
  return response.data;
};