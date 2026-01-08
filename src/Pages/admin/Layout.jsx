import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <AdminNavbar />
      { }
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        { }
        <AdminSidebar />

        { }
        <div className="flex-1 px-4 py-2 overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
