import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { signOut } from 'next-auth/react'

const config: DocsThemeConfig = {
  logo: (
    <img
      src="https://paisuscripciones.com/website/img/pai-official-stripe-partner.png"
      alt="Nextra Logo"
      className="w-40" 
    />
  ),
  footer: {
    text: 'Nextra Docs Template',
  },
  navbar: {
     extraContent: (
       <button
         onClick={() => signOut({ callbackUrl: '/' })}
         className="nx-btn nx-btn-primary py-2 px-4 rounded hover:bg-red-100"
       >
         Logout
       </button>
     ),
  },
}

export default config