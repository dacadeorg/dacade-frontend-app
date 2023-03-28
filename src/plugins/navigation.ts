import CommunityNavigation from "@/utilities/CommunityNavigation";
import router from "next/router";


 const navigation = (()=> {
  return {
    community: new CommunityNavigation(router),
  }
})()

export default navigation