import React, { useState, useEffect } from 'react';
import { getMe, deleteMe } from '../controllers/me';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Me.css';

const Me = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await getMe();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      fetchData();
    }
  }, [isFirstLoad]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      await deleteMe();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    navigate('../UpdateMe');
  };

  return (
    <div>
      <ul>
        <li>
          <Link className="a" to="../Home">
            Home
          </Link>
        </li>
        <li>
          <Link className="a" to="../Me">
            Me
          </Link>
        </li>
        <li>
          <Link className="a" to="../Friends">
            Friends
          </Link>
        </li>
        <li>
          <Link className="a" to="/">
            Log Out
          </Link>
        </li>
      </ul>
      <div className="container">
        <h2>Utilisateur</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Username: {user.username}</h5>
            <p className="card-text">Full Name: {user.fullName}</p>
            <p className="card-text">Email: {user.email}</p>
            <button onClick={handleBack} className="btn btn-back">
              Retour
            </button>
            <button onClick={handleUpdate} className="btn btn-back">
              Modifier
            </button>
            <button onClick={handleDelete} className="btn btn-back">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;
