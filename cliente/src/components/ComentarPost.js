import React, { useState } from "react";

export default function ComentarPost({ onSubmitComentario, showError }) {
  const [mensaje, setMensaje] = useState("");
  const [sendComment, setSendComentario] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sendComment) return;

    try {
      setSendComentario(true);
      await onSubmitComentario(mensaje);
      setMensaje("");
      setSendComentario(false);
    } catch (error) {
      setSendComentario(false);
      showError("hubo un problema guardando el comentario. Intente de nuevo");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="Post__comentario-form-container"
    >
      <input
        type="text"
        placeholder="Deja un comentario..."
        required
        max="180"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
}
