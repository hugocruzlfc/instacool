import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function NavIcons({ usuario }) {
  return (
    <>
      <li className="Nav__link-push">
        <Link
          className="Nav__link"
          to="/upload"
        >
          <FontAwesomeIcon icon={faCameraRetro} />
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Link
          className="Nav__link"
          to="/explorer"
        >
          <FontAwesomeIcon icon={faCompass} />
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Link
          className="Nav__link"
          to={`/perfil/${usuario.username}`}
        >
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </li>
    </>
  );
}
