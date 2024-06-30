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
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold">Protected Page</h1>
        <p>Welcome, {session.user.name}!</p>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="btn">Sign out</button>
        <button onClick={goToDocs} className="btn">Go to Documentation</button>
      </div>
    );
  } else {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold">You need to sign in</h1>
        <button onClick={() => signIn()} className="btn">Sign in</button>
      </div>
    );
  }
}
