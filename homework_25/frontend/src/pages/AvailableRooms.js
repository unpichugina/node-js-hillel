import {useState} from 'react';
import API from '../api/axios';

export default function AvailableRooms() {
    const [date, setDate] = useState('');
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const res = await API.get(`/rooms/available?date=${date}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            setRooms(res.data);
        } catch (err) {
            console.error('Помилка завантаження кімнат');
        }
    };

    return (
        <div style={{maxWidth: 600, margin: '40px auto'}}>
            <h2>Доступні кімнати</h2>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={fetchRooms} style={{marginLeft: 10}}>Перевірити</button>

            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        Кімната #{room.room_number} — {room.room_type} — ${room.price_per_night}
                    </li>
                ))}
            </ul>
        </div>
    );
}
