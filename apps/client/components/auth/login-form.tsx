'use client';

import React from 'react';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const router = useRouter();
  const session = useSession(); // TODO: Put in a wrapper to handle loading state

  React.useEffect(() => {
    if (session?.data?.error === '') {
      router.push('/dashboard');
    }
  }, [session.data]);

  return (
    <div className="flex w-full justify-center mt-32">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-zinc-800 flex flex-col">
        <div className="mt-4 flex justify-center items-center gap-4">
          <Button
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}