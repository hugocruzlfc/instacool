import { Route, Routes } from "react-router-dom";

import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Upload from "../pages/Upload";
import Feed from "../pages/Feed";
import PostView from "../pages/PostView";
import Explorer from "../pages/Explorer";
import Perfil from "../pages/Perfil";

export function LoginRoutes({ showError, usuario, logout }) {
  return (
    <Routes>
      <Route
        path="/upload"
        element={<Upload showError={showError} />}
      />
      <Route
        path="/post/:id"
        element={
          <PostView
            showError={showError}
            usuario={usuario}
          />
        }
      />
      <Route
        path="/perfil/:username"
        element={
          <Perfil
            showError={showError}
            usuario={usuario}
            logout={logout}
          />
        }
      />
      <Route
        path="/explorer"
        element={<Explorer showError={showError} />}
      />
      <Route
        path="*"
        element={
          <Feed
            showError={showError}
            usuario={usuario}
          />
        }
      />
    </Routes>
  );
}

export function LogoutRoutes({ login, signup, showError }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login
            login={login}
            showError={showError}
          />
        }
      />
      <Route
        path="*"
        element={
          <Signup
            signup={signup}
            showError={showError}
          />
        }
      />
    </Routes>
  );
}
