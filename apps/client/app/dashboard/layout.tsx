'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
      <aside className="w-64 bg-zinc-800 text-white flex flex-col">
        <div className="p-4 flex items-center">
          <img src="https://placehold.co/30x30" alt="logo" className="mr-2" />
          <span className="text-xl font-semibold">Hosty.</span>
        </div>
        <nav className="flex-1 px-2 py-4">
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-zinc-700"
          >
            Dashboard
          </a>
          <a href="#" className="block py-2.5 px-4 rounded bg-zinc-700">
            Analytics
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-zinc-700"
          >
            Sites
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-zinc-700"
          >
            Explore Domain
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-zinc-700"
          >
            Website Builder
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-zinc-700"
          >
            Manage Service
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-zinc-700"
          >
            Monitoring
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-zinc-700"
          >
            Activity Log
          </a>
          <button onClick={onSignOut}>log out</button>
        </nav>
      </aside>
      {children}
    </div>
  );
}
