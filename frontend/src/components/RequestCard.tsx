import { RequestCardProps } from "../utils/types";
import { FaLongArrowAltRight } from "react-icons/fa";
import Button from "./Button";
import { acceptRequest, retractRequest } from "../api/user";
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from "recoil";
import {
  ReceivedRequestAtom,
  SentRequestAtom,
  OngoingRequestAtom,
  LoaderAtom,
} from "../store/atom/user";

const RequestCard = (props: RequestCardProps) => {
  const refreshReceivedRequests =
    useRecoilRefresher_UNSTABLE(ReceivedRequestAtom);
  const refreshSentRequests = useRecoilRefresher_UNSTABLE(SentRequestAtom);
  const refreshOngoingRequests =
    useRecoilRefresher_UNSTABLE(OngoingRequestAtom);
  const setLoading = useSetRecoilState(LoaderAtom);

  const statusColor = {
    PENDING: "text-yellow-600",
    ONGOING: "text-yellow-600",
    APPROVED: "text-green-600",
  };

  const handleAcceptClick = async () => {
    setLoading(true);
    await acceptRequest(props.id);
    setLoading(false);
    refreshReceivedRequests();
    refreshSentRequests();
    refreshOngoingRequests();
  };

  const handleRetractClick = async () => {
    setLoading(true);
    await retractRequest(props.id);
    setLoading(false);
    refreshReceivedRequests();
    refreshSentRequests();
    refreshOngoingRequests();
  };

  return (
    <div className="flex items-center justify-between bg-dark py-5 px-10 rounded-lg mb-3">
      <div className=" flex items-center justify-between w-1/3">
        <p className="text-accent">{props.sender}</p>
        <FaLongArrowAltRight />
        <p>{props.receiver}</p>
      </div>
      <div className="flex items-center gap-x-5">
        <p className={`${statusColor[props.status]}`}>{props.status}</p>
        {(props.type !== "sent" && props.type !== "ongoing") && (
          <>
            <Button
              type="button"
              label="Accept"
              className="px-5 py-2 font-medium"
              onClick={handleAcceptClick}
            />
            <Button
              type="button"
              label="Reject"
              className="px-5 py-2 bg-red-950 text-red-600 font-medium"
              onClick={handleRetractClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
