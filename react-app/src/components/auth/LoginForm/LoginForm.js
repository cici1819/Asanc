import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../../store/session';
import DemoUserLogin from '../DemoUser';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='login-page'>
      <div className='login-form'>
        <form onSubmit={onLogin}>
          <div className='welcome-title'>
            <h2>Welcome to Asanc!</h2>
          </div>
          <div className='welcome-content'>
            <h3>We're so excited to see you!</h3>
          </div>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='login-e-input'>
            <div className='l-e-font'>
              <label htmlFor='email'>Email</label>
            </div>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login-p-input'>
            <div className='l-p-font'>
            <label htmlFor='password'>Password</label>
            </div>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='login-button'>
          <button type='submit'>Log In</button>
          </div>

        </form>
      </div>
      <div className='Demo-button'>
          <DemoUserLogin />
        </div>
    </div>

  );
};

export default LoginForm;
