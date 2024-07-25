import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserCardSkeleton = () => {
  return (
    <div>
      <div>
        <Skeleton width={240} />
        <Skeleton width={240} height={200} />
        <Skeleton width={240} count={2} />
        <Skeleton width={240} height={30} />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
