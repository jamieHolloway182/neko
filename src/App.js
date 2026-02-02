import Navbar from './components/Layout/Navbar';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import CalendarPage from './pages/Calendar/CalendarPage';
import UsersPage from './pages/Users/UsersPage';
import UserShowPage from './pages/Users/UserShowPage';
import UserEditPage from './pages/Users/UserEditPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCreatePage from './pages/Users/UserCreatePage';
import LoginPage from './pages/LoginPage';
import ClientsPage from './pages/ClientsPage';
import PreviousCalendarPage from './pages/Calendar/PreviousCalendarPage';
import { UsersProvider } from './contexts/UserContext';
import { ToastProvider } from './contexts/ToastContext';
import { DayStatusProvider } from './contexts/DayStatusContext';

function App() {

  return (
    <div className="bg-dark text-light p-3" style={{ minHeight: "100vh" }}>
      <Navbar></Navbar>
      <DayStatusProvider>
        <UsersProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/calendar" replace />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/calendar/previous" element={<PreviousCalendarPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/show/:id" element={<UserShowPage />} />
              <Route path="/users/edit/:id" element={<UserEditPage />} />
              <Route path="/users/create" element={<UserCreatePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/clients" element={<ClientsPage />} />
            </Routes>
          </ToastProvider>
        </UsersProvider>
      </DayStatusProvider>
    </div>
  );
}

export default App;
