import React, { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import ButtonLike from "./ButtonLike";
import ComentarPost from "./ComentarPost";

import { toggleLike, createComment } from "../helpers/post-helpers";

export default function Post({ post, updatePost, showError, usuario }) {
  const {
    numLikes,
    comentarios,
    numComentarios,
    _id,
    caption,
    url,
    usuario: usarioPost,
    estaLike,
  } = post;
  const [sendLike, setSendLike] = useState(false);

  const onSubmitLike = async () => {
    if (sendLike) return;

    try {
      setSendLike(true);
      const postActualizado = await toggleLike(post);
      updatePost(post, postActualizado);
      setSendLike(false);
    } catch (error) {
      setSendLike(false);
      showError("Hubo un problema modificando el like. Intente de nuevo");
      console.log(error);
    }
  };

  const onSubmitComentario = async (mensaje) => {
    const postActualizado = await createComment(post, mensaje, usuario);
    updatePost(post, postActualizado);
  };

  return (
    <div className="Post-Componente">
      <Avatar usuario={usarioPost} />
      <img
        className="Post-Componente__img"
        src={url}
        alt={caption}
      />
      <div className="Post-Componente__acciones">
        <div className="Post-Componente__like-container">
          <ButtonLike
            onSubmitLike={onSubmitLike}
            like={estaLike}
          />
        </div>
        <p>Liked por {numLikes} personas</p>
        <ul>
          <li>
            <Link to={`/perfil/${usarioPost.username}`}>
              <b>{usarioPost.username}</b>
            </Link>
            &nbsp;
            {caption}
          </li>
          <VerTodosLosComentarios
            _id={_id}
            numComentarios={numComentarios}
          />
          <Comentarios comentarios={comentarios} />
        </ul>
      </div>
      <ComentarPost onSubmitComentario={onSubmitComentario} />
    </div>
  );
}

function VerTodosLosComentarios({ _id, numComentarios }) {
  if (numComentarios < 4) return null;

  return (
    <li className="text-grey-dark">
      <Link to={`/post/${_id}`}>Ver los {numComentarios} comentarios</Link>
    </li>
  );
}

function Comentarios({ comentarios }) {
  if (comentarios.length === 0) return null;

  return comentarios.map((comentario) => {
    return (
      <li key={comentario._id}>
        <Link to={`/perfil/${comentario.usuario.username}`}>
          <b>{comentario.usuario.username}</b>
        </Link>
        &nbsp;
        {comentario.mensaje}
      </li>
    );
  });
}
