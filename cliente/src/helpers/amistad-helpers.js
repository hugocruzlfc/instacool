import axios from "axios";

export default async function toggleSiguiendo(usuario) {
  let usuarioActualizado;

  if (usuario.siguiendo) {
    await axios.delete(`/api/amistades/${usuario._id}/eliminar`);
    usuarioActualizado = {
      ...usuario,
      numSeguidores: usuario.numSeguidores - 1,
      siguiendo: false,
    };
  } else {
    await axios.post(`/api/amistades/${usuario._id}/seguir`);
    usuarioActualizado = {
      ...usuario,
      numSeguidores: usuario.numSeguidores + 1,
      siguiendo: true,
    };
  }

  return usuarioActualizado;
}
