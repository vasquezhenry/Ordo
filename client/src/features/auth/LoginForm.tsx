import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { signIn } from './authSlice';

interface Input {
  email: string;
}
export default function LoginForm() {
  const { handleSubmit, register, setError } = useForm<Input>();
  const [input, setInput ] = React.useState("");
  const dispatch = useAppDispatch();
  const handleChange = (event: any)=> {
    setInput(event.target.value);
  }
  const onSubmit = async (value: string) => {
    try {
      await dispatch(signIn(value)).unwrap();
      alert('Check email to complete login!');
    } catch (error) {
      console.log(error);
      setError('email', {
        message: 'Bad!',
      });
    }
  };

  return (

    
    <div>
      <p>
        {'First Time User? '}
        {'Thats OK! JUust type in your email and then go to your email.'}
      </p>
      <p>
      <TextField
        required
        id="outlined-required"
        label="Required"
        size="small"
        placeholder="Enter Your Email for first time users"
        onChange={handleChange}
      />
      <Button size='large' variant="contained" onClick={() => onSubmit(input)} type="submit">Submit</Button> 
      </p> 
    </div>
  );
}
