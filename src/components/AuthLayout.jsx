import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoder] = useState(true);
  const authStatus = useSelector((state) => state.authentication.status);
  useEffect(() => {
    //If the page needs you to be logged in, but you aren’t: Go to the login page.
    if (authentication && !authStatus) navigate("/login");
    //If the page doesn’t need you to be logged in, but you are: Go to the homepage.
    else if (!authentication && authStatus) navigate("/");
    //Otherwise: Show the content.
    setLoder(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
