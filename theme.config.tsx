import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

const Logo = () => {
  const { theme } = useTheme();

  return (
    <img
      src={
        theme === 'dark'
          ? 'https://paisuscripciones.com/website/img/pai-official-stripe-partner-white.png'
          : 'https://paisuscripciones.com/website/img/pai-official-stripe-partner.png'
      }
      alt="Pai docs logo"
      className="w-40"
    />
  );
};

const LogoutButton = () => {
  const { theme } = useTheme();

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
        theme === 'dark'
          ? 'text-white bg-black hover:bg-gray-800 focus:ring-black'
          : 'text-black bg-white hover:bg-gray-200 focus:ring-gray-400'
      } focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      Logout
    </button>
  );
};

const config: DocsThemeConfig = {
  logo: <Logo />,
  footer: {
    component: null
  },
  navbar: {
    extraContent: <LogoutButton />,
  },
  feedback: {
    content: null, // Disable feedback button
  },
  editLink: {
    component: null, // Disable edit link
  },
  gitTimestamp: null, // Disable last edited
  search: {
    placeholder: 'Buscar...', // Change search placeholder text
  }
};

export default config;