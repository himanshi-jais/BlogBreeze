import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.authentication.status);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Your Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-cyan-800 text-white sticky top-0 z-50 shadow-md">
      <Container>
        <nav className="flex item-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center space-x-4 ">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full ${
                      location.pathname === item.slug
                        ? "bg-cyan-500 text-white"
                        : "text-white"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus ? (
              <li>
                <LogoutBtn />
              </li>
            ) : null}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
