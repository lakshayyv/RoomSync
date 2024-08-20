import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RequestCardSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-x-10 h-[300px]">
        <Skeleton width={1200} height={60} />
        <Skeleton width={1200} height={60} />
        <Skeleton width={1200} height={60} />
    </div>
  );
};

export default RequestCardSkeleton;
