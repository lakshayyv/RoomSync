import { Navigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { AuthAtom } from "../store/atom/user";
import { ProtectedRouteProps } from "../utils/types";
import Loader from "../components/Loader";

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const isLoggedIn = useRecoilValueLoadable(AuthAtom);

  return (
    <>
      {isLoggedIn.state === "loading" ? (
        <Loader />
      ) : isLoggedIn.contents ? (
        props.element
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
};

export default ProtectedRoute;
