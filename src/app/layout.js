"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/reduxslice/store";
import { SnackbarProvider } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Folder, LogOut } from "lucide-react";

const UserContext = createContext();
export const rootData = () => useContext(UserContext);

const Sidebar = () => {
  const menu = [
    { name: "Dashbaord", icon: <LayoutDashboard />, href: "/dashboard" },
    { name: "Reports", icon: <Folder />, href: "/report" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[180px] bg-white border-r border-gray-200 text-black flex flex-col">
      <div className="p-5 text-lg font-semibold border-b border-gray-200">
        Modules
      </div>
      <nav className="flex-1 mt-4">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const Header = ({ user, onLogout }) => (
  <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 ">
    <div>
      <h1 className="text-lg font-semibold text-gray-800 leading-none">
        Welcome{user?.username ? `, ${user.username}` : ""}
      </h1>
      {user?.email && (
        <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
      )}
    </div>

    <button
      onClick={onLogout}
      className="flex items-center justify-center bg-red-500 text-white w-9 h-9 rounded-full hover:bg-red-600 transition-colors"
      title="Logout"
    >
      <LogOut size={16} />
    </button>
  </header>
);

export default function RootLayout({ children }) {
  const [user, setUser] = useState(undefined); // undefined initially
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;

    setUser(userData);

    if (!userData) {
      // Not logged in → redirect only from protected routes
      if (pathName !== "/login") {
        router.replace("/login");
      }
    } else {
      // Logged in → prevent access to /login
      if (pathName === "/login") {
        router.replace("/dashboard");
      }
    }
  }, [pathName, router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Provider store={store}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <UserContext.Provider value={{ user }}>
              {user === undefined ? (
                <div className="flex items-center justify-center min-h-screen">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : user ? (
                <div className="flex">
                  <Sidebar />
                  <div className="ml-[180px] flex-1 flex flex-col min-h-screen">
                    <Header user={user} onLogout={handleLogout} />
                    <main className="flex-1 p-6">{children}</main>
                  </div>
                </div>
              ) : (
                children
              )}
            </UserContext.Provider>
          </SnackbarProvider>
        </Provider>
      </body>
    </html>
  );
}
