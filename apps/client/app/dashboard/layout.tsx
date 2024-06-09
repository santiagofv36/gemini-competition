'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LINKS = [
  {
    id: 'Dashboard',
    icon: <div></div>,
    href: '/dashboard',
    text: 'Dashboard',
  },
  {
    id: 'Analytics',
    icon: <div></div>,
    href: '/analytics',
    text: 'Analytics',
  },
  {
    id: 'Sites',
    icon: <div></div>,
    href: '/sites',
    text: 'Sites',
  },
  {
    id: 'Explore Domain',
    icon: <div></div>,
    href: '/explore-domain',
    text: 'Explore Domain',
  },
  {
    id: 'Website Builder',
    icon: <div></div>,
    href: '/website-builder',
    text: 'Website Builder',
  },
  {
    id: 'Manage Service',
    icon: <div></div>,
    href: '/manage-service',
    text: 'Manage Service',
  },
  {
    id: 'Monitoring',
    icon: <div></div>,
    href: '/monitoring',
    text: 'Monitoring',
  },
  {
    id: 'Activity Log',
    icon: <div></div>,
    href: '/activity-log',
    text: 'Activity Log',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession(); // TODO: Put in a wrapper to handle loading state
  const router = useRouter();

  React.useEffect(() => {
    if (
      session?.data?.error === 'Session expired' ||
      session?.data === undefined
    ) {
      router.push('/login');
    }
  }, [router, session?.data?.user]);

  const onSignOut = () => {
    signOut({
      redirect: false,
    }).then(() => {
      router.push('/login');
    });
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white text-black flex flex-col">
        <div className="p-4 flex items-center justify-center">
          <span className="text-xl font-semibold">
            Gmail
            <span className="text-primary-100"> Automator</span>
          </span>
        </div>
        <nav className="flex-1 px-2 py-4 flex flex-col justify-between">
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <>
                {link.icon}
                <Link
                  href={link.href}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary-100 hover:text-white"
                >
                  {link.text}
                </Link>
              </>
            ))}
          </div>
          <button onClick={onSignOut} className="block py-2.5 px-4">
            log out
          </button>
        </nav>
      </aside>
      <main className="flex-1 bg-zinc-100">
        <nav className="flex justify-between w-full bg-white p-6">Hello</nav> 
        {/* Search bar & user */}
        {children}
      </main>
    </div>
  );
}
