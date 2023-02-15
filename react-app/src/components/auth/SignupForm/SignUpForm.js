import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../../store/session';
import asancLogo from "../../../img/asanc-logo.png"
import signUpImg from "../../../img/signUp-img.png"
import DemoUserLogin from '../DemoUser';
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
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
    else if (password !== repeatPassword) {
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
    else if (firstName.length > 30 || lastName.length > 30) {
      return setErrors(['FirstName and lastName should less than 30 characters'])
    }
    else if (username.length > 30) {
      return setErrors(["Username should less than 30 characters"])
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
      <div className='left-img2'>
        <img src={signUpImg} alt="main-img" />
      </div>
      <div className='seprate-line-login2'>

      </div>
      <div className='signup-form'>
        <form onSubmit={onSignUp}>
          <NavLink className="signUp-page-logo" to={"/home"}>
            <img src={asancLogo} alt="logo" className="logo-img-2" />
            <span className="logo-name">
              Asanc
            </span>
          </NavLink>
          <div className='form-title'>
            <span>Create an account </span>
          </div>
          <div className='errors-lists-s'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='signUp-input'>
            <div className='s-u-font'>
              <label>User Name</label>
            </div>
            <input
              className='s-input'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='signUp-input'>
            <div className='s-u-font'>
              <label>Email address</label>
            </div>
            <input
              className='s-input'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='signUp-input'>
            <div className="s-u-font">
              <label >First Name </label>
            </div>
            <input
              className='s-input'
              type='text'
              name='firstName'
              onChange={updatefirstName}
              value={firstName}
            ></input>
          </div>
          <div className="signUp-input">
            <div className="s-u-font">
              <label >Last Name </label>
            </div>
            <input
              className='s-input'
              type='text'
              name='lastName'
              onChange={updatelastName}
              value={lastName}
            ></input>
          </div>
          <div className='signUp-input'>
            <div className='s-u-font'>
              <label>Password</label>
            </div>
            <input
              className='s-input'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='signUp-input' id="c-signUp-input">
            <div className='s-u-font'>
              <label>Confirm Password</label>
            </div>
            <input
              className='s-input'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            // required={true}
            ></input>
          </div>

          <div className='signup-button'>
            <button id="signup-button2" type='submit'>Sign Up</button>
          </div>
        </form>
        <div className='Demo-button' id='signUp'>
          <DemoUserLogin />
        </div>
        <div className='link-login'>
          <NavLink className="logIn-link" to={"/login"}>Already have an account?</NavLink>
        </div>

      </div>

    </div>

  );
};

export default SignUpForm;
