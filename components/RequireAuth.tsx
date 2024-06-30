import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const RequireAuth = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return <>{children}</>;
  }

  return null;
};

export default RequireAuth;
