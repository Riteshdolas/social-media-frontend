// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/header/Nav"
import MobileNav from "../components/header/MobileNav";

function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
      <MobileNav />
    </div>
  );
}

export default Layout;
