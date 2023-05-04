import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {
  AdminUsersPage,
  AdminBooksPage,
  AdminDashboardPage,
} from './lib/admin';
import { HomePage, UserPage } from './lib/main';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/books" element={<AdminBooksPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
