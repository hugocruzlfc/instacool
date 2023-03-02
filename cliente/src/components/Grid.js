import React from "react";
import { Link } from "react-router-dom";

export default function Grid({ posts }) {
  //[1,2,3,4,5] => [[1,2,3],[4,5]]

  const columnas = posts.reduce((columnas, post) => {
    const ultimaColumna = columnas[columnas.length - 1];
    if (ultimaColumna && ultimaColumna.length < 3) ultimaColumna.push(post);
    else columnas.push([post]);

    return columnas;
  }, []);

  return (
    <div>
      {columnas.map((columna, index) => {
        return (
          <div
            key={index}
            className="Grid__row"
          >
            {columna.map((post) => (
              <GridFoto
                _id={post._id}
                url={post.url}
                caption={post.caption}
                key={post._id}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function GridFoto({ _id, url, caption }) {
  return (
    <Link
      className="Grid__post"
      to={`/post/${_id}`}
    >
      <img
        src={url}
        alt={caption}
        className="Grid__post-image"
      />
    </Link>
  );
}
