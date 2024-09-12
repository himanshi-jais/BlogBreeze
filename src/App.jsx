import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import { useEffect } from "react";
import { Header, Footer } from "./components/index";
import { login, logout } from "./redux/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData)
          dispatch(
            login({
              userData,
            })
          );
        else dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="w-full block">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
