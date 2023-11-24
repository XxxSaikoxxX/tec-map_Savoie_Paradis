import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyFriends, deleteFriend } from '../controllers/friends';
import { useNavigate } from 'react-router-dom';
import '../css/Friends.css'; 

const Friends = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [friends, setFriends] = useState([]);
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await getMyFriends();
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (firstLoad) {
      fetchData();
      setFirstLoad(false);
    }
  }, [firstLoad]);

  const handlOnDelete = async (friendId) => {
    try {
      const response = await deleteFriend(friendId);
      window.alert('Ami supprimé');
      nav('../Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ul>
        <li><Link className="a" to='../Home'>Home</Link></li>
        <li><Link className="a" to='../Me'>Me</Link></li>
        <li><Link className="a" to='../Friends'>Friends</Link></li>
        <li><Link className="a" to='../'>Log Out</Link></li>
      </ul>
      <div className="container">
        <h1>Liste d'amis</h1>
        <Link className='addFriend' to='../AddFriends'>Ajouter un ami</Link>
        <h4>Cette liste contient les utilisateurs dont vous pouvez voir leurs positions</h4>
        <table>
          <thead>
            <tr>
              <th>Nom Complet</th>
              <th>Position : Latitude</th>
              <th>Position : Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              friends.map(friend => (
                <tr key={friend._id}>
                  <td>
                    <h4>{friend.username}</h4>
                    <p>{friend.email}</p>
                  </td>
                  <td>{friend.position ? friend.position.lat : 0}</td>
                  <td>{friend.position ? friend.position.long : 0}</td>
                  <td>
                    <button className='btn btn-cancel' onClick={() => handlOnDelete(friend._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Friends;
