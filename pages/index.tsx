import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const goToDocs = () => {
    router.push('/docs'); // Asume que la ruta de la documentación es /docs
  };

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
          <h1 className="text-3xl font-bold text-center">Protected Page</h1>
          <p className="text-center">Welcome, {session.user.name}!</p>
          <div className="flex flex-col space-y-4">
            <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium">
              Sign out
            </button>
            <button onClick={goToDocs} className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium">
              Go to Documentation
            </button>
          </div>
        </div>
      </div>
    );
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
}
