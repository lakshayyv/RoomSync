import { useRecoilValueLoadable } from "recoil";
import { UserAtom } from "../store/atom/user";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";
import ProfileItem from "../components/ProfileItem";

const Profile = () => {
  const user = useRecoilValueLoadable(UserAtom);
  return (
    <div className="ml-[16.67%] p-10">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="text-gray-500 mb-5">View your profile and update it</p>
      {user.state === "loading" ? (
        <ProfileSkeleton />
      ) : user.contents === null ? (
        <div>No user data available</div>
      ) : (
        <>
          <ProfileItem title="Name" value={user.contents.name} field="name" />
          <ProfileItem title="Age" value={user.contents.age} field="age" />
          <ProfileItem title="Year" value={user.contents.year} field="year" />
          <ProfileItem
            title="Course"
            value={user.contents.course}
            field="course"
          />
        </>
      )}
    </div>
  );
};

export default Profile;
