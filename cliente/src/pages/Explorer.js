import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Main from "../components/Main";
import Loading from "../components/Loading";
import { ImagenAvatar } from "../components/Avatar";
import Grid from "../components/Grid";

export default function Explorer({ showError }) {
  const [posts, setPosts] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPostsAndUsers();
  }, []);

  const loadPostsAndUsers = async () => {
    try {
      const [posts, usuario] = await Promise.all([
        axios.get("/api/posts/explore").then(({ data }) => data),
        axios.get("/api/usuarios/explore").then(({ data }) => data),
      ]);
      setPosts(posts);
      setUsuarios(usuario);
      setLoading(false);
    } catch (error) {
      showError(
        "Hubo un problema cargando explorer. Por favor recargue la página"
      );
      console.log(error);
    }
  };

  if (loading)
    return (
      <Main center>
        <Loading />
      </Main>
    );

  return (
    <Main center>
      <div className="Explore__section">
        <h2 className="Explore__title">Descubrir usuarios</h2>
        <div className="Explore__usuarios-container">
          {usuarios.map((usuario) => {
            return (
              <div
                className="Explore__usuario"
                key={usuario._id}
              >
                <ImagenAvatar usuario={usuario} />
                <p>{usuario.username}</p>
                <Link to={`/perfil/${usuario.username}`}>Ver perfil</Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Explore__section">
        <h2 className="Explore__title">Explorar</h2>
        <Grid posts={posts} />
      </div>
    </Main>
  );
}
