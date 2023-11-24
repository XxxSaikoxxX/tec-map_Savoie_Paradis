import { useState } from 'react'
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { getMe, putMe } from '../controllers/me';
import { Link } from 'react-router-dom';
const UpdateMe = () => {
    const [userName, setUserNAme] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [fistLoad, setFristLoad] = useState(true);
    const nav = useNavigate();
    const handlOnChangeserName = (e) => {
        setUserNAme(e.target.value);
    }
    const handlOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlOnChangeFullName = (e) => {
        setFullName(e.target.value);
    }

    const setInput = async () => {
        const { data } = await getMe();
        console.log(data);
        setEmail(data.email);
        setFullName(data.fullName)
        setUserNAme(data.username);
    }

    if (fistLoad) {
        setFristLoad(false);
        setInput();
    }

    const handlOnUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await putMe(userName, fullName, email);
            console.log(response);
            // nav(-1);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div >
            <ul>
                <li><Link className="a" to='../Home'>Home</Link></li>
                <li><Link className="a" to='../Me'>Me</Link></li>
                <li><Link className="a" to='../Friends'>Friends</Link></li>
                <li><Link className="a" to='../'>Log Out</Link></li>
            </ul>
            <div className='container'>
                <h1 className='title'>Modification</h1>
                <form onSubmit={handlOnUpdate} >
                    <Input
                        type="text"
                        className="input-form"
                        placeholder='Votre nom d utilisateur'
                        value={userName}
                        setValue={handlOnChangeserName}
                    />
                    <Input
                        type="email"
                        className="input-form"
                        placeholder='Entrer votre email'
                        value={email}
                        setValue={handlOnChangeEmail}
                    />
                    <Input
                        type="text"
                        className="input-form"
                        placeholder='Entrer votre nom complet'
                        value={fullName}
                        setValue={handlOnChangeFullName}
                    />
                    <button type='submit' className="btn btn-connexion">Enregister</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateMe