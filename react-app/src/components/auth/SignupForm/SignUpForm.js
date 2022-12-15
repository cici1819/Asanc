import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../../store/session';
import "../SignupForm/SignupForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
    else if (password !== repeatPassword) {
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatefirstName = (e) => {
    setfirstName(e.target.value);
  };

  const updatelastName = (e) => {
    setlastName(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='signup-page'>
      <div className='signup-form'>
        <form onSubmit={onSignUp}>
          <div className='form-title'>
            <h1>Create an account </h1>
          </div>
          <div className='s-error-lists'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='signup-username-input'>
            <div className='s-u-font'>
              <label>User Name</label>
            </div>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='signup-email-input'>
            <div className='s-e-font'>
              <label>Email</label>
            </div>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='signup-firstName-input'>
            <div className="s-f-font">
              <label >First Name </label>
            </div>
            <input
              type='text'
              name='email'
              onChange={updatefirstName}
              value={firstName}
            ></input>
          </div>
          <div className="signup-lastName-input">
            <div className="s-l-font">
            <label >Last Name *</label>
            </div>
            <input
              type='text'
              name='email'
              onChange={updatelastName}
              value={lastName}
            ></input>
          </div>
          <div className='signup-password-input'>
            <div className='s-p-font'>
              <label>Password</label>
            </div>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='signup-c-p-input'>
            <div className='s-c-p-font'>
              <label>Confirm Password</label>
            </div>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='signup-button'>
            <button type='submit'>Sign Up</button>
          </div>
        </form>
        <div className='link-login'>
          <Link to={"/login"}>Already have an account?</Link>
        </div>
      </div>

    </div>

  );
};

export default SignUpForm;
