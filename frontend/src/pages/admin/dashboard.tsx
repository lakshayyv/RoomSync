import { useRecoilValueLoadable } from "recoil";
import { AllUserAtom } from "../../store/atom/admin";
import UserCard from "../../components/UserCard";
import student from "../../assets/student.avif";
import UserCardSkeleton from "../../components/skeleton/UserCardSkeleton";

const AdminDashboard = () => {
  const allUser = useRecoilValueLoadable(AllUserAtom);

  return (
    <div className="p-10 pr-5 w-5/6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="text-gray-500 mb-5">View users and send requests</p>
      <div className="grid grid-cols-4 gap-4items-center">
        {allUser.state === "loading" ? (
          Array(4)
            .fill(0)
            .map((_, i) => {
              return <UserCardSkeleton key={i} />;
            })
        ) : typeof allUser.contents === "string" ? (
          <div>{allUser.contents}</div>
        ) : (
          allUser.contents.map((user: any) => {
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

export default AdminDashboard;
