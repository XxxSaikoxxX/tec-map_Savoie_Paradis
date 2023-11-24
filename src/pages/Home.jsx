import React from 'react';
import Maps from '../components/Maps';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <ul>
                <li><Link className="a" to='../Home'>Home</Link></li>
                <li><Link className="a" to='../Me'>Me</Link></li>
                <li><Link className="a" to='../Friends'>Friends</Link></li>
                <li><Link className="a" to='../'>Log Out</Link></li>
            </ul>
            <Maps className='map' />
        </div>
    )
}

export default Home