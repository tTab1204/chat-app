import React, { useState } from 'react';
import './LoginPageStyle.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '@/firebase';

const LoginPage = ({ history }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      history.push('/');
      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit('');
      }, 5000);
    }
  };

  return (
    <div className='auth-wrapper'>
      <div style={{ textAlign: 'center' }}>
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name='email'
          type='email'
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Password</label>
        <input
          name='password'
          type='password'
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>Password must have at least 6 characters</p>
        )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type='submit' disabled={loading} />
        <Link to='/sign-up'>아직 아이디가 없으세요?</Link>
      </form>
    </div>
  );
};

export default LoginPage;
