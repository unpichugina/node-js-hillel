import {useEffect, useState} from 'react';
import API from '../api/axios';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(5);
    const [status, setStatus] = useState('');

    const fetchReviews = async () => {
        try {
            const res = await API.get('/reviews');
            setReviews(res.data);
        } catch (err) {
            console.error('Помилка завантаження відгуків');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setStatus('Необхідно увійти для додавання відгуку');
            return;
        }

        try {
            await API.post(
                '/reviews',
                {message, rating},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStatus('Відгук додано!');
            setMessage('');
            setRating(5);
            fetchReviews(); // оновити список
        } catch (err) {
            setStatus('Помилка додавання відгуку');
        }
    };

    return (
        <div style={{maxWidth: 600, margin: '40px auto'}}>
            <h2>Відгуки</h2>
            {reviews.map((r) => (
                <div key={r.id} style={{borderBottom: '1px solid #ccc', marginBottom: 10}}>
                    <strong>{r.author}</strong> (⭐ {r.rating})
                    <p>{r.message}</p>
                </div>
            ))}

            <h3>Додати відгук</h3>
            <form onSubmit={handleSubmit}>
        <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ваш відгук..."
            rows="3"
            style={{width: '100%', marginBottom: '10px'}}
        />
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
                <button type="submit" style={{marginLeft: '10px'}}>Надіслати</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}
