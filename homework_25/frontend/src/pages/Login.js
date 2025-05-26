import {useState} from 'react';
import API from '../api/axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', {email, password});
            localStorage.setItem('token', res.data.accessToken);
            setMessage('Успішний вхід');
        } catch (err) {
            setMessage('Помилка авторизації');
        }
    };

    return (
        <div style={{maxWidth: 400, margin: '50px auto'}}>
            <h2>Логін</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{display: 'block', width: '100%', marginBottom: '10px'}}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{display: 'block', width: '100%', marginBottom: '10px'}}
                />
                <button type="submit">Увійти</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
