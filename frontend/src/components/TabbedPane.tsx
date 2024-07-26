import { useNavigate } from "react-router-dom";
import { TabbedPaneProps } from "../utils/types";

const TabbedPane = (props: TabbedPaneProps) => {
  const navigate = useNavigate();

  const handleClick = (location: string) => {
    navigate("/request?type=" + location);
  };

  return (
    <div className="flex justify-center mb-5">
      <div className="flex items-center font-semibold gap-x-5 bg-dark w-fit px-3 py-3 rounded-xl">
        <h1
          className={`flex justify-center items-center w-[150px] py-2 rounded-lg cursor-pointer ${
            props.type === "received" && "bg-theme"
          }`}
          onClick={() => handleClick("received")}
        >
          Received
        </h1>
        <h1
          className={`flex justify-center items-center w-[150px] py-2 rounded-lg cursor-pointer ${
            props.type === "sent" && "bg-theme"
          }`}
          onClick={() => handleClick("sent")}
        >
          Sent
        </h1>
        <h1
          className={`flex justify-center items-center w-[150px] py-2 rounded-lg cursor-pointer ${
            props.type === "ongoing" && "bg-theme"
          }`}
          onClick={() => handleClick("ongoing")}
        >
          Ongoing
        </h1>
      </div>
    </div>
  );
};

export default TabbedPane;
