'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Dashboard() {
  const router = useRouter();

  const session = useSession(); // TODO: Put in a wrapper to handle loading state
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (session?.data?.error === 'Session expired') {
      router.push('/login');
    }
    setLoading(false);
  }, [router, session?.data?.user]);

  const onSignOut = () => {
    signOut({
      redirect: false,
    }).then(() => {
      router.push('/login');
    });
  };

  console.log(session);

  if (loading) {
    return <div>Loading...</div>;
  }

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

      <main className="flex-1 bg-zinc-100 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <div className="flex items-center space-x-4">
            <img
              src="https://placehold.co/30x30"
              alt="notifications"
              className="rounded-full"
            />
            <img
              src="https://placehold.co/30x30"
              alt="user"
              className="rounded-full"
            />
          </div>
        </header>

        <div className="flex space-x-4 mb-6">
          <button className="px-4 py-2 bg-zinc-200 rounded">Resources</button>
          <button className="px-4 py-2 bg-zinc-200 rounded">CDN Usage</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Response
          </button>
          <button className="px-4 py-2 bg-zinc-200 rounded">Cache</button>
          <button className="px-4 py-2 bg-zinc-200 rounded">Geo & IP</button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">45,940</h2>
                <p className="text-zinc-600">Redirects</p>
              </div>
              <div className="text-green-500">+5.78%</div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">56.1%</h2>
                <p className="text-zinc-600">Success rate</p>
              </div>
              <div className="text-green-500">+3.85%</div>
            </div>
          </div>
          <div className="bg-orange-100 p-4 rounded">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">3,100</h2>
                <p className="text-zinc-600">Errors</p>
              </div>
              <div className="text-red-500">+1.64%</div>
            </div>
          </div>
          <div className="bg-zinc-800 text-white p-4 rounded">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">36.2%</h2>
                <p className="text-zinc-400">Error ratio</p>
              </div>
              <div className="text-green-500">+3.26%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Response</h3>
            <img src="https://placehold.co/600x300" alt="Response chart" />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">
              Response code breakdown
            </h3>
            <img
              src="https://placehold.co/300x300"
              alt="Response code breakdown chart"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
