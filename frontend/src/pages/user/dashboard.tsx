import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AllUserAtom } from "../../store/atom/user";
import UserCard from "../../components/UserCard";
import student from "../../assets/student.avif";
import { fetchAllUser } from "../../api/dashboard";
import UserCardSkeleton from "../../components/skeleton/UserCardSkeleton";

const Dashboard = () => {
  const [allUser, setAllUser] = useRecoilState(AllUserAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (allUser.length < 1) {
          const response = await fetchAllUser();
          setAllUser(response);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ml-[16.67%] p-10 pr-5 w-5/6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-500 mb-5">View users and send requests</p>
      <div className="grid grid-cols-4 gap-4items-center">
        {loading &&
          Array(4)
            .fill(0)
            .map((_, i) => {
              return <UserCardSkeleton key={i} />;
            })}
        {!allUser ? (
          <div>No user for now...</div>
        ) : (
          allUser.map((user: any) => {
            return (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                src={student}
                age={user.age}
                year={user.year}
                course={user.course}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
