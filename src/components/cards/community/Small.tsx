import Currency from "@/components/ui/Currency";
import { ReactElement } from "react";
import Image from "next/image";
import { Community } from "@/types/community";

/**
 * Interface for CommunityCardSmall props
 * @date 3/30/2023 - 1:18:26 PM
 *
 * @interface CommunityCardSmallProps
 * @typedef {CommunityCardSmallProps}
 */
interface CommunityCardSmallProps {
  data: {
    community: Community;
    score: number;
  };
}

/**
 * CommunityCardSmall component
 * @date 3/30/2023 - 1:18:32 PM
 *
 * @export
 * @param {CommunityCardSmallProps} {
  data,
}
 * @returns {ReactElement}
 */
export default function CommunityCardSmall({ data }: CommunityCardSmallProps): ReactElement {
  return (
    <div className="bg-gray-100 rounded-full pl-2 py-2 flex items-center w-fit">
      <a target="__blank" className="block flex-none">
        <div className="w-10 h-10 rounded-full border border-solid flex items-center" style={{ backgroundColor: data.community.colors.primary }}>
          <Image src={data.community.icon} className="mx-auto text-center flex items-center w-5" alt="Community icon" width={20} height={20} />
        </div>
      </a>
      <p className="inline-block px-2 flex-1">{data.community.name}</p>
      <div className="bg-orange text-orange-light flex-none text-sm border border-solid border-yellow-100 px-1.5 rounded py-0.5 inline-block mr-4">
        <span className="font-semibold">
          <Currency value={data.score} token="REP" />
        </span>
      </div>
    </div>
  );
}
