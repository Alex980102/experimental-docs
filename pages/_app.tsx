import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import '../styles/globals.css'; // Importa tus estilos globales
import RequireAuth from '../components/RequireAuth';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const isProtectedRoute = router.pathname !== '/auth/signin';

  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <SessionProvider session={session}>
        {isProtectedRoute ? (
          <RequireAuth>
            <Component {...pageProps} />
          </RequireAuth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;