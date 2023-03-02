import axios from "axios";

const toggleLike = async (post) => {
  const URL = `/api/posts/${post._id}/likes`;
  let postConLikeActualizado;

  if (post.estaLike) {
    await axios.delete(URL, {});
    postConLikeActualizado = {
      ...post,
      estaLike: false,
      numLikes: post.numLikes - 1,
    };
  } else {
    await axios.post(URL, {});
    postConLikeActualizado = {
      ...post,
      estaLike: true,
      numLikes: post.numLikes + 1,
    };
  }

  return postConLikeActualizado;
};

const createComment = async (post, mensaje, usuario) => {
  const { data: nuevoComentario } = await axios.post(
    `/api/posts/${post._id}/comentarios`,
    { mensaje }
  );

  nuevoComentario.usuario = usuario;

  const postConComentariosActualizados = {
    ...post,
    comentarios: [...post.comentarios, nuevoComentario],
    numComentarios: post.numComentarios + 1,
  };
  return postConComentariosActualizados;
};

export { toggleLike, createComment };
