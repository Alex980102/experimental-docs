// components/RequireAuth.tsx
import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import LoadingSpinner from './LoadingSpinner';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // Inicia sesión si no está autenticado
    }
  }, [status]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;