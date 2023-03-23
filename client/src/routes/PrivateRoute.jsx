import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {Navigate, Outlet } from "react-router-dom";


const PrivateRoute = ({ userLog, children, redirectTo = "/" }) => {
  const { isAuthenticated, user } = useAuth0();
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    if (isAuthenticated) {
      setAuthStatus({ isAuthenticated: true, user: user });
    } else {
      setAuthStatus({ isAuthenticated: false, user: null });
    }
  }, [isAuthenticated, user]);
  console.log("Private Route",authStatus,userLog)
  if(!userLog) {
    return <Navigate to={redirectTo} />; 
  }
  return children? children: <Outlet/>
}

export default PrivateRoute;
