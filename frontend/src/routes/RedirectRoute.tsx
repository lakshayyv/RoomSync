import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AuthAtom } from "../store/atom/user";
import { ProtectedRouteProps } from "../utils/types";
import { useEffect, useState } from "react";
import { checkAuth } from "../api/user";
import Loader from "../components/Loader";

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(AuthAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await checkAuth();
      setIsLoggedIn(response);
      setIsLoading(false);
    };

    fetchAuth();
  }, [setIsLoggedIn]);

  if (isLoading) {
    return <Loader />;
  }

  return isLoggedIn ? <Navigate to="/" /> : props.element;
};

export default ProtectedRoute;
