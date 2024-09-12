import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout } from "./components/index.js";
import LoginComponent from "./components/LoginComponent.jsx";
import SignUp from "./pages/SignUp.jsx";

import AddPost from "./pages/AddPost";

import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <LoginComponent />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        }
      />
      <Route
        path="/all-posts"
        element={
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        }
      />
      <Route
        path="/add-post"
        element={
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        }
      />
      <Route
        path="/post/:slug"
        element={
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
