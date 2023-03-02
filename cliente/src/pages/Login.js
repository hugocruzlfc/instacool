import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Axios from "axios";
import Main from "../components/Main";

export default function Login({ login, showError }) {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await Axios.post("/api/usuarios/login", usuario);
      await login(usuario.email, usuario.password);
    } catch (err) {
      showError(err.response.data.message);
      console.error(err);
    }
  };

  return (
    <Main center>
      <div className="FormContainer">
        <h1 className="Form__titulo">Clontagram</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={usuario.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Contrsena"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={usuario.password}
            />
            <button className="Form__submit">Login</button>
            <p className="FormContainer__info">
              No tienes cuenta?<Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
}
