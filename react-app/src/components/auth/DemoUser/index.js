
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import './DemoUser.css'


function DemoUserLogin() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const credential = 'demo@aa.io'
    const password = 'password'

    return dispatch(login(credential, password));
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className='demo-user-login-button' type="submit">Demo User</button>
    </form>
  );
}

export default DemoUserLogin;
