import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import AvailableRooms from './pages/AvailableRooms';
import BookRoom from './pages/BookRoom';
import MyBookings from './pages/MyBookings';


function App() {
    return (
        <BrowserRouter>
            <nav style={{padding: 10}}>
                <Link to="/login" style={{marginRight: 10}}>Логін</Link>
                <Link to="/register" style={{marginRight: 10}}>Реєстрація</Link>
                <Link to="/reviews" style={{marginRight: 10}}>Відгуки</Link>
                <Link to="/available" style={{marginRight: 10}}>Доступні кімнати</Link>
                <Link to="/book" style={{marginRight: 10}}>Забронювати</Link>
                <Link to="/my-bookings" style={{marginRight: 10}}>Мої бронювання</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path="/available" element={<AvailableRooms/>}/>
                <Route path="/book" element={<BookRoom/>}/>
                <Route path="/my-bookings" element={<MyBookings/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
