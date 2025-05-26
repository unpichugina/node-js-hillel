import {useState} from 'react';
import API from '../api/axios';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', {email, password});
            setMessage('Реєстрація успішна!');
        } catch (err) {
            setMessage('Користувач вже існує або помилка');
        }
    };

    return (
        <div style={{maxWidth: 400, margin: '50px auto'}}>
            <h2>Реєстрація</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Зареєструватися</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
