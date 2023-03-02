import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Main from "../components/Main";
import Loading from "../components/Loading";
import Avatar from "../components/Avatar";
import ComentarPost from "../components/ComentarPost";
import NotFound from "../components/NotFound";
import ButtonLike from "../components/ButtonLike";

import { toggleLike, createComment } from "../helpers/post-helpers";

export default function PostView({ showError, usuario }) {
  const [post, setPost] = useState(null);
  const postId = useParams();
  const [loading, setLoading] = useState(true);
  const [postNoExiste, setPostNoExiste] = useState(false);
  const [sendLike, setSendLike] = useState(false);

  useEffect(() => {
    getPost();
  }, [postId.id]);

  const getPost = async () => {
    try {
      const { data: post } = await axios.get(`/api/posts/${postId.id}`);
      setPost(post);
      setLoading(false);
    } catch (error) {
      //   console.log(error.response);
      if (
        (error.response && error.response.status === 404) ||
        error.response.status === 400
      ) {
        setPostNoExiste(true);
      } else {
        showError("Hubo un problema cargando este post");
      }
      setLoading(false);
    }
  };

  const onSubmitComentario = async (mensaje) => {
    const postActualizado = await createComment(post, mensaje, usuario);
    setPost(postActualizado);
  };

  const onSubmitLike = async () => {
    if (sendLike) return;

    try {
      setSendLike(true);
      const postActualizado = await toggleLike(post);
      setPost(postActualizado);
      setSendLike(false);
    } catch (error) {
      setSendLike(false);
      showError("Hubo un problema modificando el like. Intente de nuevo");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  if (postNoExiste) {
    return <NotFound mensaje="El post no existe" />;
  }

  if (post == null) return null;

  return (
    <Main center>
      <PostItem
        {...post}
        onSubmitComentario={onSubmitComentario}
        onSubmitLike={onSubmitLike}
      />
    </Main>
  );
}

function PostItem({
  comentarios,
  caption,
  url,
  usuario,
  estaLike,
  onSubmitLike,
  onSubmitComentario,
}) {
  return (
    <div className="Post">
      <div className="Post__image-container">
        <img
          src={url}
          alt={caption}
        />
      </div>
      <div className="Post__side-bar">
        <Avatar usuario={usuario} />
        <div className="Post__comentarios-y-like">
          <Comments
            usuario={usuario}
            caption={caption}
            comentarios={comentarios}
          />
          <div className="Post__like">
            <ButtonLike
              onSubmitLike={onSubmitLike}
              like={estaLike}
            />
          </div>
          <ComentarPost onSubmitComentario={onSubmitComentario} />
        </div>
      </div>
    </div>
  );
}

function Comments({ usuario, caption, comentarios }) {
  return (
    <ul className="Post__comentarios">
      <li className="Post__comentario">
        <Link
          to="/prefil/${usuario.username}"
          className="Post__autor-comentario"
        >
          <b>{usuario.username}</b>
        </Link>
        &nbsp;
        {caption}
      </li>
      {comentarios.map((comentario) => (
        <li
          className="Post__comentario"
          key={comentario._id}
        >
          <Link
            to="/prefil/${comentario.usuario.username}"
            className="Post__autor-comentario"
          >
            <b>{comentario.usuario.username}</b>
          </Link>
          {comentario.mensaje}
        </li>
      ))}
    </ul>
  );
}
