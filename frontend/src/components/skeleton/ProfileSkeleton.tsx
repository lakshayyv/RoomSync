import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-x-10 h-[300px]">
        <Skeleton width={1000} height={30} />
        <Skeleton width={1000} height={30} />
        <Skeleton width={1000} height={30} />
        <Skeleton width={1000} height={30} />
        <Skeleton width={1000} height={30} />
    </div>
  );
};

export default ProfileSkeleton;
