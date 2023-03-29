import CommunityNavigation from "@/utilities/CommunityNavigation";
import router from "next/router";


const navigation = {
  community: new CommunityNavigation(router),
}

export default navigation