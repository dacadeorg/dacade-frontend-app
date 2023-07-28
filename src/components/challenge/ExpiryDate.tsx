import { Challenge as ChallengeTypes } from "@/types/course";

export default function ExpiryDate({ expiresAt }: { expiresAt?: ChallengeTypes["expiresAt"] }) {
  return (
    <div className="bg-gray-50 py-6 px-3 md:py-9 md:px-3 border rounded border-solid border-gray-200 flex items-center justify-start md:justify-center my-5">
      <p className="text-gray-700 flex md:flex-col items-center gap-1 text-sm">
        Challenge expiry date:
        <span className="font-medium text-center">{expiresAt}</span>
      </p>
    </div>
  );
}
