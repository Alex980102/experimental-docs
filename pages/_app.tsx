import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '../styles/globals.css'; // Importa tus estilos globales
import RequireAuth from './components/RequireAuth';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const isProtectedRoute = router.pathname !== '/auth/signin';

  return (
    <SessionProvider session={session}>
      {isProtectedRoute ? (
        <RequireAuth>
          <Component {...pageProps} />
        </RequireAuth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;