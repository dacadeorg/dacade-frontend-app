import CommunityNavigation from "@/utilities/CommunityNavigation";
import { useRouter } from "next/router";

export default function useNavigation() {
  const router = useRouter();
  return {
    community: new CommunityNavigation(router),
  };
}
