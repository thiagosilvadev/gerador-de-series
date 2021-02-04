import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState(false);
  const router = useRouter();
  function handleChange(e) {
    setInput(e.target.value);
    if (input !== "" || input.includes("https://www.themoviedb.org/tv/")) {
      setError(false);
    }
  }
  function geraImagem(e) {
    e.preventDefault();
    if (input == "" || !input.includes("https://www.themoviedb.org/tv/")) {
      setError(true);
      return;
    }
    const arrQuery = input.split("/");
    const query = arrQuery[arrQuery.length - 1].split("-");

    router.push(`/detalhe?id=${query[0]}`);
  }
  return (
    <>
      <Head>
        <title>Gerador de Séries</title>
      </Head>
      <div className="container">
        <main className={styles.main}>
          <h1>Gerador de Séries</h1>
          <form action="" onSubmit={geraImagem}>
            <div className={styles.wrapper}>
              <label>
                <span>Digite o link do tmdb:</span>
                <input
                  type="text"
                  onChange={handleChange}
                  value={input}
                  placeholder="Ex: https://www.themoviedb.org/tv/1438-the-wire"
                />
              </label>
              <button>Gerar Imagem</button>
            </div>
            {error && (
              <p className={styles.error}>
                Erro: Digite um link válido do tmdb
              </p>
            )}
          </form>
        </main>

        <footer className={styles.footer}>
          <h4>2021 - Feito por Thiago Silva</h4>
        </footer>
      </div>
    </>
  );
}
