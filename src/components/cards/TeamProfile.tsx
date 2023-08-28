import Image from "next/image";
import logo from "../../../public/img/alex.jpg";
// this component will be completed once we have team user profile images
const TeamProfile = () => {
  return (
    <div className=" w-15 h-15 rounded-full overflow-hidden flex justify-between items-between flex-wrap">
      {/* Dummy data is used for now  */}
      {["no profile", logo, logo, logo].map((image, index) => (
        <div key={index} className="bg-blue-600">
          {typeof image === "object" ? (
            <Image src={image} width={30} height={30} alt="profile" />
          ) : (
            <div className="w-7.5 h-7.5 flex justify-center items-center font-medium text-xs text-white">L</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamProfile;
