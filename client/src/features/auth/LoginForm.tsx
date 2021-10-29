import React from "react";
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { signIn } from './authSlice';

interface Input {
  email: string;
}
export default function LoginForm() {
  const { handleSubmit, register, setError } = useForm<Input>();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: Input) => {
    try {
      await dispatch(signIn(data.email)).unwrap();
      alert('Check email to complete login!');
    } catch (error) {
      console.log(error);
      setError('email', {
        message: 'Bad!',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Email:
      <input {...register('email')} />
      <button type="submit">Submit</button>
    </form>
  );
}
