import React from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);

      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userInfo', JSON.stringify(result.user));


      navigate('/home');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };


  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email Address</label>
          <input type="email" placeholder="thomas@acme.com" {...register('email', { required: true })}  />
          {errors.email && <p className="error">Email is required</p>}

          <label>Password</label>
          <input type="password" placeholder="••••••••" {...register('password', { required: true })} />

          {errors.password && <p className="error">Password is required</p>}
          <p style={{ marginTop: '-10px',textAlign: 'right' }}> 
            <a href="/newpass"   style={{     cursor: 'pointer'   }}> Create New Password  </a>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
    </div >
  );
};

export default SignIn;
