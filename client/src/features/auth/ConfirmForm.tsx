import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { confirm } from './authSlice';

interface Input {
  email: string;
}
function ConfirmForm() {
  const { handleSubmit, register, setError } = useForm<Input>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const email = localStorage.getItem('emailForSignIn');

  React.useEffect(() => {
    if (email) {
      dispatch(confirm({ email: email, code: window.location.href })).then(() => history.push('/'));
    }
  });

  const onSubmit = async (data: Input) => {
    try {
      await dispatch(confirm({ email: data.email, code: location.search })).unwrap();
      history.push('/');
    } catch (error) {
      console.log(error);
      setError('email', {
        message: 'Bad!',
      });
    }
  };

  if (email) return <p>loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Confirm
      <br />
      Email:
      <input {...register('email')} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ConfirmForm;
