import Head from "next/head";
import React from "react";

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
    <div className="bg-dark-blue text-white">
      <Head>
        <title>Gerador de Séries</title>
      </Head>

      <div className="container mx-auto ">
        <main className="flex flex-col items-center justify-center h-screen">
          <h1 className="mb-12 text-5xl font-bold">Gerador de Séries</h1>

          <form
            action=""
            onSubmit={geraImagem}
            className="flex flex-col items-start justify-center w-3/5 mx-auto"
          >
            <p className="self-start mb-4 ml-1">Insira o Link do TMDB</p>
            <div className="w-full flex items-center justify-center">
              <input
                type="text"
                onChange={handleChange}
                value={input}
                placeholder="Ex: https://www.themoviedb.org/tv/1438-the-wire"
                className="px-6 py-2 text-dark-blue w-4/5 rounded-l-full outline-none border-2 transition-all focus:border-light-purple"
              />

              <button className="px-5 w-1/5  py-2 bg-light-purple rounded-full transform -translate-x-1/4 border-2 border-light-purple focus:outline-none hover:border-white">
                Gerar Imagem
              </button>
            </div>
            {error && (
              <p className="mt-8 text-red-400">
                Erro: Digite um link válido do tmdb
              </p>
            )}
          </form>
        </main>

        {/* <footer>
          <h4>2021 - Feito por Thiago Silva</h4>
        </footer> */}
      </div>
    </div>
  );
}
