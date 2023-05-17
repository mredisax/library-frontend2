import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {
  AdminUsersPage,
  AdminBooksPage,
  AdminDashboardPage,
} from './lib/admin';
import { HomePage } from './lib/main';
import { UserPage } from './lib/user';
import { BooksPage, BookPage } from './lib/books';
import { RegisterPage } from './lib/authentication';
import { useEffect, useState } from 'react';
import { UserContext } from './core/context/UserContext';
import { useLocalStorageUser } from './core/localStorage';
import { User } from './core/localStorage/models/User.model';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const { user: localStorageUser } = useLocalStorageUser();

  useEffect(() => {
    if (localStorageUser) {
      setUser(localStorageUser);
    }
  }, [localStorageUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/archive" element={<BooksPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          {user && user.is_admin && (
            <Route path="/admin/books" element={<AdminBooksPage />} />
          )}
          {user && user.is_admin && (
            <Route path="/admin/users" element={<AdminUsersPage />} />
          )}
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
