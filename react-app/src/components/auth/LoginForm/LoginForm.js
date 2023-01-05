import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../../store/session';
import asancLogo from "../../../img/asanc-logo.png"
import DemoUserLogin from '../DemoUser';
import LoginImg from "../../../img/login.png"
import "./LoginForm.css"

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
      <div className='left-img'>
        <img src={LoginImg} alt="main-img" />
      </div>
      <div className='seprate-line-login'>

      </div>
      <div className='login-form-right'>
        <form onSubmit={onLogin}>
          <NavLink className="login-page-logo" to={"/home"}>
            <img src={asancLogo} alt="logo" className="logo-img-2" />
            <span className="logo-name">
              Asanc
            </span>
          </NavLink>
          <div className='welcome-title'>
            <span>Log in to Asanc</span>
          </div>

          <div className='errors-lists-login'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='login-e-input'>
            <div className='l-e-font'>
              <label htmlFor='email'>Email address</label>
            </div>
            <input
              className='l-e-input'
              name='email'
              type='text'
              // placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login-e-input'>
            <div className='l-e-font'>
              <label htmlFor='password'>Password</label>
            </div>
            <input
              className='l-e-input'
              name='password'
              type='password'

              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='login-button'>
            <button id="home-signUp" type='submit'>Log In</button>
          </div>

        </form>
        <div className='Demo-button'>
          <DemoUserLogin />
        </div>
        <div className='signUp-link'>
          <span>Don't have an account?</span>
          <NavLink id="login-signUp-link"to={'/sign-up'}>Sign up</NavLink>
        </div>
      </div>


    </div>

  );
};

export default LoginForm;
