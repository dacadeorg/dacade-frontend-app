import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";

/**
 * Request component
 * @date 3/30/2023 - 3:56:57 PM
 *
 * @export
 * @returns {*}
 */
export default function Request() {
  //  TODO:  to be uncommented when user slice is implemented
  //  const referrals = useSelector((state) => state.user.referrals.list);
  //  TODO: to be uncommented when user slice is implemented
  //    const previewList = referrals.slice(0, 3);

  const onClick = () => {
    // TODO:  navigate to /profile/referrals
  };

  return (
    <div
      // TODO: to be uncommented when redux is ready
      //   className={`relative flex items-center ${
      //     referrals && referrals.length ? "" : "hidden"
      //   }`}
      className="relative flex items-center"
    >
      <div className="flex pr-3 cursor-pointer" onClick={onClick}>
        {/*  TODO: to be uncommented when redux is ready
        {previewList.map((referral, index: number) => (
          <Avatar
            key={index}
            className={`border-2 border-solid border-white ${
              index > 0 ? "-ml-3" : ""
            }`}
            useLink={false}
            user={referral.user}
          />
        ))} */}
      </div>
      <div
        className="text-sm md:flex text-gray-500 md:font-medium font-normal relative cursor-pointer"
        onClick={onClick}
      >
        <span className="md:inline-block">
          {/* TODO: to be uncommented when redux is ready
             {referrals.length} Friends have used your invite code 
          */}
        </span>
      </div>
    </div>
  );
}
