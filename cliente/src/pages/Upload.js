import React, { useState } from "react";
import Axios from "axios";
import Main from "../components/Main";
import LoadImagen from "../components/LoadImagen";
import { useNavigate } from "react-router-dom";

export default function Upload({ showError }) {
  const [imagenUrl, setImagenUrl] = useState("");
  const [loadImagen, setLoadImage] = useState(false);
  const [sendPost, setSendPost] = useState(false);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const hanldeSelectImage = async (e) => {
    try {
      setLoadImage(true);
      const file = e.target.files[0];

      const config = {
        headers: {
          "Content-Type": file.type,
        },
      };

      const { data } = await Axios.post("/api/posts/upload", file, config);
      setImagenUrl(data.url);
      setLoadImage(false);
    } catch (error) {
      setLoadImage(false);
      showError(error.response.data);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendPost) return;
    if (loadImagen) {
      showError("No se ha terminado de subir la imagen");
      return;
    }

    if (!imagenUrl) {
      showError("Primero selecciona una imagen");
      return;
    }

    try {
      setSendPost(true);
      const body = {
        caption,
        url: imagenUrl,
      };
      await Axios.post("/api/posts", body);
      setSendPost(false);
      navigate("/");
    } catch (error) {
      showError(error.response.data);
    }
  };

  return (
    <Main center>
      <div className="Upload">
        <form onSubmit={handleSubmit}>
          <div className="Upload__image-section">
            <LoadImagen
              imagenUrl={imagenUrl}
              loadImagen={loadImagen}
              hanldeSelectImage={hanldeSelectImage}
            />
          </div>
          <textarea
            name="caption"
            className="Upload__caption"
            required
            maxLength="180"
            placeholder="Caption de tu post"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="Upload__submit">Post</button>
        </form>
      </div>
    </Main>
  );
}
