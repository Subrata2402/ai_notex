import React, { useRef, useState } from 'react';
import './SignIn.scss';
import { FaRegEyeSlash, FaRegUser, FaRegEye } from "react-icons/fa";
import { MdOutlinePassword, MdOutlineEmail } from "react-icons/md";
import { Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const passwordInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const togglePasswordVisibility = () => {
    passwordInput.current.type = showPassword ? 'password' : 'text';
    setShowPassword(!showPassword);
    console.log('Show password:', passwordInput.current.type);
  }

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <div className="signin-header">
          <h2>Sign In</h2>
        </div>
        <div className="signin-form">
          <div className="group-input">
            <div className="input-label">
              <FaRegUser size={'1.2rem'} />
              <label htmlFor='username'>Username</label>
            </div>
            <div className="input-field">
              <input
                id='username'
                name='username'
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <IconButton>
                <MdOutlineEmail size={'1.5rem'} />
              </IconButton>
            </div>
          </div>
          <div className="group-input">
            <div className="input-label">
              <MdOutlinePassword size={'1.2rem'} />
              <label htmlFor='password'>Password</label>
            </div>
            <div className="input-field">
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                ref={passwordInput}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconButton onClick={togglePasswordVisibility}>
                {
                  showPassword ?
                    <FaRegEyeSlash size={'1.5rem'} />
                    : <FaRegEye size={'1.5rem'} />
                }
              </IconButton>
            </div>
          </div>
          <div className="rf-section">
            <FormControlLabel
              control={
                <Checkbox
                  name="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />
            <Link to='/auth/forgot-password'>
              <Button>
                Forgot Password?
              </Button>
            </Link>
          </div>
          <Button
            variant='contained'
            className='submit-button'
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <div className="signup-link">
            Don't have an account? <Link to='/auth/signup'>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;