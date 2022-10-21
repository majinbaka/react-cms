import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@app/hooks/reduxHooks';
import Error404Page from '@app/pages/Error404Page';

const RequireAuth = ({ children, roles }: { children: JSX.Element; roles: Array<any> }) => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.user.user);

  const userHasRequiredRole = token && user && roles.includes(user?.role) && roles.length > 0 ? true : false;

  if (!token) {
    return <Navigate to={`auth/login`} state={{ from: location }} />;
  }

  if (token && !userHasRequiredRole) {
    return <Error404Page />;
  }

  return children;
};

export default RequireAuth;
