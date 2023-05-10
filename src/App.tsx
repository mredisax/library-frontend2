import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {
  AdminUsersPage,
  AdminBooksPage,
  AdminDashboardPage,
} from './lib/admin';
import { HomePage, UserPage } from './lib/main';
import { LoginPage, RegisterPage } from './lib/authentication';
import { BooksPage, BookPage } from './lib/books';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/archive" element={<BooksPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/books" element={<AdminBooksPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
