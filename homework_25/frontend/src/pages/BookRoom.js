import {useState} from 'react';
import API from '../api/axios';

export default function BookRoom() {
    const [guestId, setGuestId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/bookings', {
                guest_id: guestId,
                room_id: roomId,
                check_in_date: checkIn,
                check_out_date: checkOut
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            setStatus('Бронювання успішне!');
            setGuestId('');
            setRoomId('');
            setCheckIn('');
            setCheckOut('');
        } catch (err) {
            setStatus('Помилка бронювання');
        }
    };

    return (
        <div style={{maxWidth: 600, margin: '40px auto'}}>
            <h2>Забронювати кімнату</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="ID гостя"
                    value={guestId}
                    onChange={(e) => setGuestId(e.target.value)}
                    required
                /><br/>
                <input
                    type="number"
                    placeholder="ID кімнати"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    required
                /><br/>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                /><br/>
                <button type="submit">Забронювати</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}
