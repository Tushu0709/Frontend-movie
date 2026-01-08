import React from "react";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";



import Layout from "./Pages/admin/Layout";

import AddMovie from "./Pages/admin/AddMovie";
import UpdateMovie from "./Pages/admin/UpdateMovie";
import ListMovies from "./Pages/admin/ListMovies";
import Login from "./Pages/Login";
import AdminLogin from "./Pages/AdminLogin";
import Register from "./Pages/Register";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";

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
