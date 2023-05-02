import { Route, Routes } from "react-router-dom";
import Home from "./home/Home.page";
import Paperbase from "./shared/Paperbase";
import AdminUsers from "./admin/users/AdminUsers.page";
import AdminBooks from "./admin/books/AdminBooks.page";
import Admin from "./admin/Admin.page";
import User from "./user/User.page";

//TODO: Tutaj Main?
export default function Main() {
  return (
    <>
      <Paperbase>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </Paperbase>
    </>
  );
}
