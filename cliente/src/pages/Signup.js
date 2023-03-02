import React, { useState } from "react";
// import Axios from "axios";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import imagesSignup from "../imagenes/signup.png";

const INITIAL_USUARIO = {
  email: "",
  username: "",
  password: "",
  bio: "",
  nombre: "",
};

export default function Signup({ signup, showError }) {
  const [usuario, setUsuario] = useState(INITIAL_USUARIO);

  const handleInputChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await Axios.post("/api/usuarios/signup", usuario);
      await signup(usuario);
      setUsuario(INITIAL_USUARIO);
    } catch (err) {
      showError(err.response.data);
      console.error(err);
    }
  };

  return (
    <Main center={true}>
      <div className="Signup">
        <img
          src={imagesSignup}
          alt=""
        />
        <div className="FormContainer">
          <h1 className="Form-titulo">Clontagram</h1>
          <p className="FormContainer__info">
            Registrate para que veas el clon de Instagram
          </p>
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
              type="text"
              name="nombre"
              placeholder="Nombre y Apellido"
              className="Form__field"
              required
              minLength="3"
              maxLength="100"
              onChange={handleInputChange}
              value={usuario.nombre}
            />
            <input
              type="text"
              name="username"
              placeholder="User"
              className="Form__field"
              required
              minLength="3"
              maxLength="30"
              onChange={handleInputChange}
              value={usuario.username}
            />
            <input
              type="tex"
              name="bio"
              placeholder="Cuentanos de ti..."
              className="Form__field"
              required
              maxLength="150"
              onChange={handleInputChange}
              value={usuario.bio}
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
            <button className="Form__submit">Sign up</button>
            <p className="FormContainer__info ">
              Ya tienes cuenta?<Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
}
