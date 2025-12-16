import AppNavbar from "./Nav";
import Sidebar from "./Sidebar";


function DashboardLayout({ children }) {
  return (
    <>
      <AppNavbar />
      <div className="d-flex">
        <Sidebar />
        <main className="p-4 w-100">{children}</main>
      </div>
    </>
  );
}

export default DashboardLayout;
