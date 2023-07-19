import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="px-2">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
