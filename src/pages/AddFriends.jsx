import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAllUsers } from '../controllers/users';
import { addFriend } from '../controllers/friends';
import { useNavigate } from 'react-router-dom';

const AddFriends = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [users, setUsers] = useState([]);
    const nav = useNavigate();

    const fetchData = async () => {
        try {
            const { data } = await getAllUsers();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    if (firstLoad) {
        fetchData();
        setFirstLoad(false);
    }

    const handlOnAdd = async (userId) => {
        try {
            const response = await addFriend(userId);
            window.alert('ami ajouter avec success');
            nav(-1);
        } catch (error) {
            console.log(error);
        }
    }
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
                <h4>Cette liste contient les utilisateurs dont vous pouvez voir leurs positions</h4>
                <table>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Nom complet</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                        {
                            users.map(

                                user => {
                                    return <tr>
                                        <td>{user.username}</td>
                                        <td>{user.fullName}</td>
                                        <td>
                                            <button className='btn btn-connexion' onClick={() => handlOnAdd(user._id)}>+</button>
                                        </td>
                                    </tr>
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default AddFriends