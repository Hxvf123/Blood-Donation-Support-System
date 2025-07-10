import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const hasLoggedOut = useRef(false); 

  useEffect(() => {
    if (!hasLoggedOut.current) {
      onLogout?.();
      hasLoggedOut.current = true;
    }
  }, [onLogout]);

  return <Navigate to="/login" replace />;
}

export default Logout;
