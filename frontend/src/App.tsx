import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Signin from "./pages/user/Signin";
import Dashboard from "./pages/user/dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import RedirectRoute from "./routes/RedirectRoute";
import { SkeletonTheme } from "react-loading-skeleton";
import Sidebar from "./components/Sidebar";
import { useRecoilValue } from "recoil";
import Loader from "./components/Loader";
import { LoaderAtom } from "./store/atom/user";
import Profile from "./pages/user/Profile";
import Request from "./pages/user/Request";
import AdminSignin from "./pages/admin/Signin";
import AdminDashboard from "./pages/admin/dashboard";

function App() {
  const loading = useRecoilValue(LoaderAtom);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="h-full">
          <Sidebar />
          <Routes>
            <Route
              path="/signup"
              element={<RedirectRoute element={<Signup />} />}
            />
            <Route
              path="/signin"
              element={<RedirectRoute element={<Signin />} to="/" />}
            />
            <Route
              path="/admin/signin"
              element={<RedirectRoute element={<AdminSignin />} to="/admin/" />}
            />
            <Route
              path="/admin/"
              element={
                <ProtectedRoute
                  element={<AdminDashboard />}
                  to="/admin/signin"
                />
              }
            />
            <Route
              path="/"
              element={<ProtectedRoute element={<Dashboard />} to="/signin" />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} to="/signin" />}
            />
            <Route
              path="/request"
              element={<ProtectedRoute element={<Request />} />}
            />
          </Routes>
        </div>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
