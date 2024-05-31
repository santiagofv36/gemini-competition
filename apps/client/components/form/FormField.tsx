import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Input } from '../ui/input';

export type FormData = {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
};

interface FormFieldProps {
  type: string;
  placeholder: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
}

export default function FormField({
  type,
  placeholder,
  register,
  name,
  error,
  valueAsNumber,
}: FormFieldProps) {
  return (
    <React.Fragment>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className="shadow appearance-none border rounded py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-zinc-70"
      />
      {error ? (
        <span className="text-rose-500 text-xs">{error.message}</span>
      ) : null}
    </React.Fragment>
  );
}
