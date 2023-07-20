import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="p-3">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
