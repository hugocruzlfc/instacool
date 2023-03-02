import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import stringToColor from "string-to-color";

import Main from "../components/Main";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import toggleSiguiendo from "../helpers/amistad-helpers";

import Grid from "../components/Grid";

import useIsMovil from "../hooks/useIsMovile";

export default function Perfil({ showError, usuario, logout }) {
  const { username } = useParams();
  const isMovil = useIsMovil();
  const [userOwnProfile, setUserOwnProfile] = useState(null);
  const [userPosts, setPosts] = useState([]);
  const [loadProfile, setLoadProfile] = useState(true);
  const [profileNoExiste, setProfileNoExiste] = useState(false);
  const [loadImage, setLoadImage] = useState(false);
  const [enviandoAmistad, setEnviandoAmistad] = useState(false);

  useEffect(() => {
    loadUserAndPost();
  }, [username]);

  const loadUserAndPost = async () => {
    try {
      setLoadProfile(true);
      const { data: usuario } = await axios.get(`/api/usuarios/${username}`);
      const { data: posts } = await axios.get(
        `/api/posts/usuario/${usuario._id}`
      );
      setUserOwnProfile(usuario);
      setPosts(posts);
      setLoadProfile(false);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 400)
      )
        setProfileNoExiste(true);
      else showError("Hubo un problema cargando este perfil");

      setLoadProfile(false);
    }
  };

  const isLoginProfile = () => {
    return usuario._id === userOwnProfile._id;
  };

  const handleSelectImage = async (e) => {
    try {
      setLoadImage(true);
      const file = e.target.files[0];
      const config = {
        headers: {
          "Content-Type": file.type,
        },
      };
      const { data } = await axios.post("/api/usuarios/upload", file, config);
      setUserOwnProfile({ ...userOwnProfile, imagen: data.url });
      setLoadImage(false);
    } catch (error) {
      showError(error.response.data);
      setLoadImage(false);
      console.log(error);
    }
  };

  const toggleFollow = async () => {
    if (enviandoAmistad) return;
    try {
      setEnviandoAmistad(true);
      const usuarioActualizado = await toggleSiguiendo(userOwnProfile);
      setUserOwnProfile(usuarioActualizado);
      setEnviandoAmistad(false);
    } catch (error) {
      showError(
        "Hubo un problema siguiendo/dejando de seguir a este usuario.Intente de nuevo"
      );
      setEnviandoAmistad(false);
      console.log(error);
    }
  };

  if (loadProfile)
    return (
      <Main center>
        <Loading />
      </Main>
    );

  if (profileNoExiste) return <NotFound mensaje="El perfil no existe" />;

  if (usuario === null) return null;

  return (
    <Main center>
      <div className="Perfil">
        <ImagenAvatar
          userOwnProfile={userOwnProfile}
          isLoginProfile={isLoginProfile}
          handleSelectImage={handleSelectImage}
          loadImage={loadImage}
        />
        <div className="Perfil__bio-container">
          <div className="Perfil__bio-heading">
            <h2 className="capitalize">{userOwnProfile.username}</h2>
            {!isLoginProfile() && (
              <ButtonFollow
                follow={userOwnProfile.siguiendo}
                toggleFollow={toggleFollow}
              />
            )}
            {isLoginProfile() && <ButtonLogout logout={logout} />}
          </div>
          {!isMovil && <DescripcionPerfil userOwnProfile={userOwnProfile} />}
        </div>
      </div>
      {isMovil && <DescripcionPerfil userOwnProfile={userOwnProfile} />}
      <div className="Perfil__separador" />
      {userPosts.lenght > 0 ? <Grid posts={userPosts} /> : <NoPosted />}
    </Main>
  );
}

function ImagenAvatar({
  isLoginProfile,
  userOwnProfile,
  handleSelectImage,
  loadImage,
}) {
  let contenido;

  if (loadImage) {
    contenido = <Loading />;
  } else if (isLoginProfile) {
    contenido = (
      <label
        className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
        style={{
          backgroundImage: userOwnProfile.imagen
            ? `url(${userOwnProfile.imagen})`
            : null,
          backgroundColor: stringToColor(userOwnProfile.username),
        }}
      >
        <input
          type="file"
          onChange={handleSelectImage}
          className="hidden"
          name="imagen"
        />
      </label>
    );
  } else {
    contenido = (
      <div
        className="Perfil__img-placeholder"
        style={{
          backgroundImage: userOwnProfile.imagen
            ? `url(${userOwnProfile.imagen})`
            : null,
          backgroundColor: stringToColor(userOwnProfile.username),
        }}
      ></div>
    );
  }

  return <div className="Perfil__img-container">{contenido}</div>;
}

function ButtonFollow({ follow, toggleFollow }) {
  return (
    <button
      onClick={toggleFollow}
      className="Perfil__boton-seguir"
    >
      {follow ? "Dejar de seguir" : "Seguir"}
    </button>
  );
}
function ButtonLogout({ logout }) {
  return (
    <button
      onClick={logout}
      className="Perfil__boton-logout"
    >
      Logout
    </button>
  );
}

function DescripcionPerfil({ userOwnProfile }) {
  return (
    <div className="Perfil__descripcion">
      <h2 className="Perfil__nombre">{userOwnProfile.username}</h2>
      <p>{userOwnProfile.bio}</p>
      <p className="Perfil__estadisticas">
        <b>{userOwnProfile.numSiguiendo}</b> following
        <span className="ml-4">
          <b>{userOwnProfile.numSeguidores}</b> followers
        </span>
      </p>
    </div>
  );
}

function NoPosted() {
  return <p className="text-center">Este usuario no ha posteado fotos</p>;
}
