import React from "react";

import Head from "next/head";

const detalhe = ({ detail, credits }) => {
  if (detail == null || credits == null) return null;

  return (
    <div className="container mx-auto px-2 md:px-0">
      <Head>
        <title>{detail.original_name} | Gerador de Séries</title>
      </Head>

      <div className="flex mt-12 gap-6">
        <div>
          <h1 className="font-bold text-6xl mb-6">{detail.original_name}</h1>
          <p>
            <span className="font-medium">Sinopse:</span>{" "}
            <span className="text-gray-600">{detail.overview}</span>
          </p>

          {detail.created_by && (
            <div className="mt-6 text-xl mb-8">
              <h4 className="font-medium">Criação:</h4>
              {detail.created_by.map((creator) => (
                <h5 key={creator.id} className="text-gray-600 mt-2">
                  {creator.name}
                </h5>
              ))}
            </div>
          )}
          {detail.networks && (
            <div className="mt-4">
              <h4 className="mb-2 font-medium text-xl">Emissora:</h4>

              <img
                src={`https://www.themoviedb.org/t/p/h30${detail.networks[0].logo_path}`}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-12">
        <h1 className="font-bold text-4xl mb-6">Elenco</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 auto-rows-min gap-4 gap-y-6 mb-6">
          {credits.cast &&
            credits.cast.map((cast) => (
              <div
                key={cast.id}
                className="flex flex-col items-center justify-start border w-full rounded "
              >
                <img
                  src={`https://www.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`}
                  alt=""
                  className="w-full h-auto object-cover"
                />
                <div className="px-2 text-center">
                  <h1 className="font-medium mt-4">{cast.character}</h1>
                  <h2 className="mt-2 italic text-gray-600 mb-4">
                    {cast.name}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const resDetail = await fetch(
    `${process.env.BASE_URL}/tv/${context.query.id}?api_key=${process.env.API_KEY}&language=pt-BR`
  );
  const detail = await resDetail.json();

  const resCredits = await fetch(
    `${process.env.BASE_URL}/tv/${context.query.id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );
  const credits = await resCredits.json();

  return {
    props: {
      detail,
      credits,
    },
  };
}

export default detalhe;
