import { Navigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { AuthAtom } from "../store/atom/auth";
import { ProtectedRouteProps } from "../utils/types";
import Loader from "../components/Loader";

const RedirectRoute = (props: ProtectedRouteProps) => {
  const isLoggedIn = useRecoilValueLoadable(AuthAtom);

  return (
    <>
      {isLoggedIn.state === "loading" ? (
        <Loader />
      ) : isLoggedIn.contents ? (
        <Navigate to={props.to || "/"} />
      ) : (
        props.element
      )}
    </>
  );
};

export default RedirectRoute;
