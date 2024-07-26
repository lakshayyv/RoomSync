import { useRecoilValueLoadable } from "recoil";
import RequestCard from "../../components/RequestCard";
import TabbedPane from "../../components/TabbedPane";
import {
  OngoingRequestAtom,
  ReceivedRequestAtom,
  SentRequestAtom,
} from "../../store/atom/user";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestCardSkeleton from "../../components/skeleton/RequestCardSkeleton";

const Request = () => {
  const receivedRequest = useRecoilValueLoadable(ReceivedRequestAtom);
  const sentRequest = useRecoilValueLoadable(SentRequestAtom);
  const ongoingRequest = useRecoilValueLoadable(OngoingRequestAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type") || "received";

  useEffect(() => {
    if (!searchParams.get("type")) {
      navigate("/request?type=received", { replace: true });
    }
  }, [navigate, searchParams]);

  const renderRequests = () => {
    let requestList;
    let requestState;

    switch (type) {
      case "received":
        requestList = receivedRequest.contents;
        requestState = receivedRequest.state;
        break;
      case "sent":
        requestList = sentRequest.contents;
        requestState = sentRequest.state;
        break;
      case "ongoing":
        requestList = ongoingRequest.contents;
        requestState = ongoingRequest.state;
        break;
      default:
        return null;
    }

    if (requestState === "loading") {
      return <RequestCardSkeleton />;
    }

    if (requestList === null) {
      return <div>No request for now...</div>;
    }

    return requestList.map((request: any) => (
      <RequestCard
        key={request.id}
        id={request.id}
        type={type}
        sender={request.senderName}
        receiver={request.receiverName}
        status={request.status}
      />
    ));
  };

  return (
    <div className="ml-[16.67%] p-10">
      <h1 className="text-2xl font-semibold">Requests</h1>
      <p className="text-gray-500 mb-5">Send, accept, reject requests</p>
      <TabbedPane type={type} />
      {renderRequests()}
    </div>
  );
};

export default Request;
