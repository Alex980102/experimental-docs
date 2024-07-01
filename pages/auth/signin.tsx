import { getCsrfToken } from "next-auth/react";
import { GetServerSideProps } from "next";

interface SignInProps {
  csrfToken: string | null;
}

const logoUrl = "https://paisuscripciones.com/website/img/pai-official-stripe-partner.png";

export default function SignIn({ csrfToken }: SignInProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center space-x-4">
          <img src={logoUrl} alt="Logo" className="h-20" />
        </div>
        <form method="post" action="/api/auth/callback/credentials" className="mt-8 space-y-6">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? ''} />
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                required 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm" 
                placeholder="Username" 
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm" 
                placeholder="Password" 
              />
            </div>
          </div>

          <div>
            <button type="submit" className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              Sign In
            </button>
          </div>
        </form>
      </div>
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