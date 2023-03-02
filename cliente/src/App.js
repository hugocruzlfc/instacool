import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "./helpers/auth-helpers";

import { LoginRoutes, LogoutRoutes } from "./routes/Routes";

import Nav from "./components/Nav";
import Loading from "./components/Loading";
import Main from "./components/Main";
import Error from "./components/Error";

initAxiosInterceptors();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    if (!getToken()) {
      setCargandoUsuario(false);
      return;
    }
    try {
      const { data: usuario } = await Axios.get("/api/usuarios/whoami");
      setUsuario(usuario);
      setCargandoUsuario(false);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    const { data } = await Axios.post("/api/usuarios/login", {
      email,
      password,
    });
    setUsuario(data.usuario);
    setToken(data.token);
  }; //data.usuario data.token

  const signup = async (usuario) => {
    const { data } = await Axios.post("/api/usuarios/signup", usuario);
    setUsuario(data.usuario);
    setToken(data.token);
  };

  const logout = () => {
    setUsuario(null);
    deleteToken();
  };

  const showError = (message) => {
    setError(message);
    // console.log(message);
  };

  const hideError = () => {
    setError(null);
  };

  if (cargandoUsuario) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  return (
    <Router>
      <Nav usuario={usuario} />
      <Error
        mensaje={error}
        hideError={hideError}
      />
      {usuario ? (
        <LoginRoutes
          showError={showError}
          usuario={usuario}
          logout={logout}
        />
      ) : (
        <LogoutRoutes
          login={login}
          signup={signup}
          showError={showError}
        />
      )}
    </Router>
  );
}
