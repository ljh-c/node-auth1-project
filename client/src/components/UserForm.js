import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosWithAuth } from '../axiosWithAuth';

function FriendForm() {
  const { register, handleSubmit, watch, errors } = useForm({ mode: 'onBlur' });
  // const onSubmit = data => { 
  //   console.log(data) 
  // };

  console.log(watch('username')) // watch input value by passing its name
    
  const login = async (credentials, evt) => {
    evt.preventDefault();

    try {
      const res = await axiosWithAuth().post('/login', credentials)
      console.dir(res);
    }
    catch(err) {
      console.dir(err);
    }
  };

  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  return (
    <form onSubmit={handleSubmit(login)}>
    {/* register your input into the hook by invoking the "register" function */}
      <input name="username" placeholder="username" ref={register({ required: true })} autoFocus />
      {errors.username && <span>This field is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <input name="password" placeholder="password" ref={register({ required: true })} type="password" />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}
      
      <button type="submit">Log In</button>{' '}<button type="submit">Register</button>
    </form>
  );
}

export default FriendForm;