// components/AuthWrapper.tsx
import React, { ReactNode } from 'react';
import { useSession, signIn } from "next-auth/react";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { data: session } = useSession();

  if (session) {
    return <>{children}</>;
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
          <h1 className="text-3xl font-bold text-center">You need to sign in</h1>
          <button onClick={() => signIn()} className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium">
            Sign in
          </button>
        </div>
      </div>
    );
  }
};

export default AuthWrapper;