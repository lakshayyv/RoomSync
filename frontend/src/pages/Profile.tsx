import { useRecoilState } from "recoil";
import { UserAtom } from "../store/atom/user";
import { fetchProfile } from "../api/user";
import { useEffect, useState } from "react";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";
import ProfileItem from "../components/ProfileItem";

const Profile = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetchProfile();
      setUser(response);
      setLoading(false);
    };

    fetchUserData();
  }, [setUser]);

  if (loading) {
    return (
      <div className="ml-[16.67%] p-10">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-gray-500 mb-5">View your profile and update it</p>
        <ProfileSkeleton />
      </div>
    );
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="ml-[16.67%] p-10">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="text-gray-500 mb-5">View your profile and update it</p>
      <ProfileItem
        title="Name"
        value={user.name}
        field="name"
        className="bg-dark"
      />
      <ProfileItem title="Age" value={user.age} field="age"/>
      <ProfileItem
        title="Year"
        value={user.year}
        field="year"
        className="bg-dark"
      />
      <ProfileItem title="Course" value={user.course} field="course" />
    </div>
  );
};

export default Profile;
