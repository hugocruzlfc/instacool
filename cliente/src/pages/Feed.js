import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Main from "../components/Main";
import Loading from "../components/Loading";
import Post from "../components/Post";

const getPosts = async (dateLastPost) => {
  const query = dateLastPost ? `?fecha=${dateLastPost}` : "";
  const { data: nuevosPosts } = await axios.get(`/api/posts/feed${query}`);

  return nuevosPosts;
};

const NUMERO_DE_POSTS_POR_LLAMADA = 3;

export default function Feed({ showError, usuario }) {
  const [posts, setPosts] = useState([]);
  const [loadPostsInit, setLoadPostsInit] = useState(true);
  const [cargandoMasPosts, setCargandoMasPosts] = useState(false);
  const [allPostsLoad, setAllPostsLoad] = useState(false);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const nuevosPosts = await getPosts();
      setPosts(nuevosPosts);
      setLoadPostsInit(false);
      checkMorePosts(nuevosPosts);
    } catch (err) {
      showError("Hubo un problema cargando tu fedd");
      console.log(err);
    }
  };

  const updatePost = (postOriginal, postActualizado) => {
    setPosts((posts) => {
      const postsActualizados = posts.map((post) => {
        if (post !== postOriginal) {
          return post;
        }

        return postActualizado;
      });
      return postsActualizados;
    });
  };

  const loadMorePosts = async () => {
    if (cargandoMasPosts) return;

    try {
      setCargandoMasPosts(true);
      const fechaDelUltimoPost = posts[posts.length - 1].fecha_creado;
      const nuevosPosts = await getPosts(fechaDelUltimoPost);
      setPosts([...posts, ...nuevosPosts]);
      setCargandoMasPosts(false);
      checkMorePosts(nuevosPosts);
    } catch (error) {
      showError("Hubo un problema cargando los siguientes posts");
      setCargandoMasPosts(false);
    }
  };

  if (loadPostsInit) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  const checkMorePosts = (nuevosPosts) => {
    if (nuevosPosts.length < NUMERO_DE_POSTS_POR_LLAMADA) setAllPostsLoad(true);
  };

  if (!loadPostsInit && posts.length === 0) {
    return (
      <Main center>
        <NoSiguesANadie />
      </Main>
    );
  }

  return (
    <Main center>
      <div className="Feed">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            updatePost={updatePost}
            showError={showError}
            usuario={usuario}
          />
        ))}
      </div>
      <CargarMasPosts
        onClick={loadMorePosts}
        todosLosPostCargados={allPostsLoad}
      />
    </Main>
  );
}

function NoSiguesANadie() {
  return (
    <div className="NoSiguesANadie">
      <p className="NoSiguesANadie__mensaje">
        Tu feed no tiene fotos porque no sigues a nadie, o porque no han
        publicado fotos
      </p>
      <div className="text-center">
        <Link
          to="/explore"
          className="NoSiguesANadie__boton"
        >
          Explora Clontagram
        </Link>
      </div>
    </div>
  );
}

function CargarMasPosts({ onClick, todosLosPostCargados }) {
  if (todosLosPostCargados) {
    return <div className="Feed__no-hay-mas-posts">No hay más posts</div>;
  }

  return (
    <button
      className="Feed__cargar-mas"
      onClick={onClick}
    >
      Ver más
    </button>
  );
}
