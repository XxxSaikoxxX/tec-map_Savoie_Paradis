// Login.jsx
import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../controllers/auth';
import '../css/Login.css'; // Import the Login.css file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handlOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlOnSubmit = async (e) => {
    e.preventDefault();
    const isGood = await login(email, password);
    if (isGood) {
      console.log('bien');
      nav('../Me');
    } else {
      setEmail('');
      setPassword('');
      console.log('probleme');
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Connexion</h1>
      <form onSubmit={handlOnSubmit} className='form-container'>
        <Input
          type='email'
          className='input-form'
          placeholder='Entrer votre email'
          value={email}
          setValue={handlOnChangeEmail}
        />
        <Input
          type='password'
          className='input-form'
          placeholder='Entrer votre mot de passe'
          value={password}
          setValue={handlOnchangePassword}
        />
        <button type='submit' className='btn-connexion'>
          Connexion
        </button>
      </form>
      <Link className='register-link' to='/Register'>
        S'inscrire...
      </Link>
    </div>
  );
};

export default Login;
