import {useEffect, useState} from 'react';
import API from '../api/axios';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await API.get('/bookings/my', {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                setBookings(res.data);
            } catch (err) {
                console.error('Помилка отримання бронювань');
            }
        };
        fetch();
    }, []);

    return (
        <div style={{maxWidth: 600, margin: '40px auto'}}>
            <h2>Мої бронювання</h2>
            {bookings.map(b => (
                <div key={b.id} style={{marginBottom: 10}}>
                    <p>Кімната: {b.room_id}</p>
                    <p>З: {b.check_in_date} До: {b.check_out_date}</p>
                    <p>Сума: ${b.total_price}</p>
                </div>
            ))}
        </div>
    );
}
