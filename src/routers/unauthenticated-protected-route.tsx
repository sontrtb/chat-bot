import { useGetUser } from "@/redux/hooks/user";
import { Navigate } from "react-router-dom";

function UnauthenticatedProtectedRoute({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const user = useGetUser()
  const isLogin = !!user?.token

  console.log("isLogin", isLogin)

  if (!isLogin) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default UnauthenticatedProtectedRoute;
