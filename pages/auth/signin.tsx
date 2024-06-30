import { getCsrfToken } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function SignIn({ csrfToken }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <br />
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <br />
        <button type="submit" className="btn">Sign In</button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};
