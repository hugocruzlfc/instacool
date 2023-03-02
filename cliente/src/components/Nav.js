import React from "react";
import NavIcons from "./NavIcons";
import { Link } from "react-router-dom";

export default function Nav({ usuario }) {
  return (
    <nav className="Nav">
      <ul className="Nav__links">
        <li>
          <Link
            to="/"
            className="Nav__link"
          >
            Clontagram
          </Link>
        </li>
        {usuario && <NavIcons usuario={usuario} />}
      </ul>
    </nav>
  );
}
