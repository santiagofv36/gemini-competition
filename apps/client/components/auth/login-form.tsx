'use client';

import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import FormField from '../form/FormField';
import { FormData } from '../form/FormField';
import { signIn } from 'next-auth/react';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSumbit = (data: FormData) => {
    signIn('credentials', {
      ...data,
    }).then((callback) => {
      console.log(callback);
      if (callback?.ok) {
        alert('logged in');
      }

      if (callback?.error) {
        alert('error');
      }
    });
  };

  return (
    <div className="flex w-full justify-center mt-32">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-zinc-800 flex flex-col">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-200 mb-4">
          Login
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          You don&apos;t have an account yet?{' '}
          <Link href="/auth/sign-up" className="underline">
            Sign Up
          </Link>
        </p>
        <form className="w-[500px]" onSubmit={handleSubmit(onSumbit)}>
          <div className="mb-4">
            <label
              className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2"
              htmlFor="Email Address"
            >
              Email Address
            </label>
            <FormField
              type="email"
              placeholder="Enter your email address"
              name="email"
              register={register}
              error={errors.email}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <div className="flex justify-between items-center">
              <label
                className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                className="inline-block underline text-sm text-zinc-500 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-400 mb-2"
                href="#"
              >
                Forgot Password?
              </Link>
            </div>
            <FormField
              type="password"
              placeholder="Enter your password"
              name="password"
              register={register}
              error={errors.password}
            />
          </div>
          <div className="mb-6">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="remember"
            />
            <label
              className="text-sm text-zinc-700 dark:text-zinc-300"
              htmlFor="remember"
            >
              Remember Me
            </label>
          </div>
          <Button
            className="bg-zinc-500 dark:bg-zinc-600 hover:bg-zinc-700 dark:hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mb-4"
            type="submit"
          >
            Sign In
          </Button>
        </form>
        <div className="flex justify-between w-full items-center gap-2">
          <div className="h-[0.5] border border-slate-500 w-full" />
          <p className="text-slate-500 w-full text-center">Or login with</p>
          <div className="h-[0.5] border border-slate-500 w-full" />
        </div>
        <div className="mt-4 flex justify-center items-center gap-4">
          <Button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Login with Google
          </Button>
          <Button className="bg-black hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Login with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
