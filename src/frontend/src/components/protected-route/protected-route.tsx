import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAuth } from "../../hooks";
import { path } from "../../assets/util/paths";

export const ProtectedRoute: FC<RouteProps> = (props) => {
  const auth = useAuth();

  return auth.isAuthenticated ? <Route {...props} /> : <Redirect to={path.dashboard} />;
};
