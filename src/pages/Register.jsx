// Register.jsx
import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../controllers/auth';
import '../css/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Added fullName state
  const nav = useNavigate();

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isGood = await register(email, password, fullName); // Passed fullName to register function
    if (isGood) {
      console.log('Successfully registered');
      nav('../'); // Fixed path for navigation
    } else {
      setEmail('');
      setPassword('');
      setFullName('');
      console.log('Registration failed');
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Inscription</h1>
      <form onSubmit={handleOnSubmit}>
        <Input
          type='text'
          className='input-form'
          placeholder='Entrer votre nom complet' // Updated placeholder
          value={fullName}
          setValue={handleOnChangeFullName}
        />
        <Input
          type='email'
          className='input-form'
          placeholder='Entrer votre email'
          value={email}
          setValue={handleOnChangeEmail}
        />
        <Input
          type='password'
          className='input-form'
          placeholder='Entrer votre mot de passe'
          value={password}
          setValue={handleOnChangePassword}
        />
        <button type='submit' className='btn btn-register'>
          S'inscrire
        </button>
      </form>
      <Link className='login-link' to='/'>
        Déjà membre ? Connectez-vous...
      </Link>
    </div>
  );
};

export default Register;
