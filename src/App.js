import React from "react";
import NavBar from "./components/NavBar.jsx";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Movies from "./Pages/Movies.jsx";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";



import Layout from "./Pages/admin/Layout.jsx";

import AddMovie from "./Pages/admin/AddMovie.jsx";
import UpdateMovie from "./Pages/admin/UpdateMovie.jsx";
import ListMovies from "./Pages/admin/ListMovies.jsx";
import Login from "./Pages/Login.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";
import Register from "./Pages/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  return (
    <AuthProvider>
      <Toaster />
      {!isAdminRoute && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />


        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={
            <AdminRoute>
                <Layout />
            </AdminRoute>
        }>

          <Route index element={<Navigate to="add-movie" replace />} />
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="edit-movie/:id" element={<UpdateMovie />} />
          <Route path="list-movies" element={<ListMovies />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </AuthProvider>
  );
};

export default App;
