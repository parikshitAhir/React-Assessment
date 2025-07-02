import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
