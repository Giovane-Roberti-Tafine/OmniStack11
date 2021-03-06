import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../service/api';

import './styles.css'

import heroes from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data);
            console.log(response.data);

            history.push('/profile');
        } catch(err) {
            alert(err)
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt=""/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID" value={id}
                    onChange={e => setId(e.target.value)}/>
                    <button type="submit"
                    className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroes} alt="Heroes"/>
        </div>
    );
}