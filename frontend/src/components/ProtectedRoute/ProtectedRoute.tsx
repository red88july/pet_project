import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import {routes} from "../../constants/constantsPage.routes.ts";

interface Props extends PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute:React.FC<Props> = ({children, isAllowed}) => {
  if(!isAllowed) {
    return <Navigate to={routes.login} />;
  }
  return children;
};

export default ProtectedRoute;