// components/RequireAuth.tsx
import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

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
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;