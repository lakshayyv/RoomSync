import { MdModeEdit } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { ProfileItemProps } from "../utils/types";
import { useRecoilState } from "recoil";
import { UserAtom } from "../store/atom/user";
import { updateUser } from "../api/user";

const ProfileItem = (props: ProfileItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(props.value);
  const [user, setUser] = useRecoilState(UserAtom);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    if (user) {
      setIsEditing(false);
      const updatedUser = { ...user, [props.field]: fieldValue };
      setUser(updatedUser);
      await updateUser(updatedUser);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  return (
    <div
      className={`flex w-full justify-between items-center text-lg py-3 px-5 mt-1 mb-1 ${props.className}`}
    >
      <p className="font-semibold">{props.title}</p>
      <div className="flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={fieldValue}
            onChange={handleInputChange}
            className="px-5 py-1 bg-dark"
          />
        ) : (
          <p>{props.value}</p>
        )}
        {isEditing ? (
          <div className="flex item-center">
            <FaRegSave
              className="ml-5 cursor-pointer"
              onClick={handleSaveClick}
            />
            <MdOutlineCancel className="ml-5 cursor-pointer text-red-600 w-5 h-5" onClick={handleCancelClick} />
          </div>
        ) : (
          <MdModeEdit
            className="ml-5 cursor-pointer"
            onClick={handleEditClick}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileItem;
