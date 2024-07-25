import { UserCardProps } from "../utils/types";
import Button from "./Button";

const UserCard = (props: UserCardProps) => {
  return (
    <div className="bg-dark w-[260px] p-5 py-3 rounded">
      <div className="my-2">
        <h1 className="font-semibold text-sm">{props.name}</h1>
        <p className="text-gray-500 text-xs">{props.course}</p>
      </div>
      <img
        src={props.src}
        className="w-full aspect-square object-cover mb-2 rounded"
      />

      <div className="flex items-center justify-between mb-2 text-sm">
        <div>
          <p>Age</p>
          <p className="text-gray-500">{props.age} yrs</p>
        </div>
        <div>
          <p>Year</p>
          <p className="text-gray-500">
            <>
              {props.year}
              {props.year === "1"
                ? "st"
                : props.year === "2"
                ? "nd"
                : props.year === "3"
                ? "rd"
                : "th"}{" "}
              year
            </>
          </p>
        </div>
      </div>
      <Button
        type="button"
        label="Request"
        className="py-2 text-sm w-full rounded font-semibold"
      />
    </div>
  );
};

export default UserCard;