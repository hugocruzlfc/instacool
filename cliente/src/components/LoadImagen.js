import React from "react";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function LoadImagen({
  loadImagen,
  imagenUrl,
  hanldeSelectImage,
}) {
  if (loadImagen) {
    return <Loading />;
  } else if (imagenUrl) {
    return (
      <img
        src={imagenUrl}
        alt=""
      />
    );
  } else {
    return (
      <label className="Upload__image-label">
        <FontAwesomeIcon icon={faUpload} />
        <span>Publica una foto</span>
        <input
          type="file"
          className="hidden"
          name="imagen"
          onChange={hanldeSelectImage}
        />
      </label>
    );
  }
}
