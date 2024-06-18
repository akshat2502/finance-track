import React from 'react'
import Header from '../components/header/header';
import SignupSigninComponent from '../components/SingupSignin/index';

function Signup() {
  return (
    <div>
      <Header />
      <div className='wrapper'><SignupSigninComponent /></div>
    </div>
  )
}

export default Signup;