import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/detalhe.module.css";
import Head from "next/head";
const detalhe = () => {
  const router = useRouter();
  const [credits, setCredits] = React.useState(null);
  const [detail, setDetail] = React.useState(null);
  // console.log(router.query);
  React.useEffect(() => {
    async function fetchData(id) {
      //////////////////
      const responseDetail = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR`
      );
      const jsonDetail = await responseDetail.json();
      setDetail(jsonDetail);

      ////////////

      ////////////////

      const responseCredits = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tv/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );
      const jsonCredits = await responseCredits.json();
      setCredits(jsonCredits);

      /////////////
    }
    fetchData(router.query.id);
  }, [router.query]);

  // const image = `/api/image-generator?id=${router.query.id}`;

  if (detail == null || credits == null) return null;

  return (
    <div className="container mx-auto">
      <Head>
        <title>{detail.original_name} | Gerador de Séries</title>
      </Head>

      <div className="flex mt-12 gap-6">
        <div className="w-3/12">
          <img
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${detail.poster_path}`}
            alt=""
            className="rounded"
          />
        </div>

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
        <div className="grid grid-cols-6 auto-rows-min gap-4 gap-y-6 mb-6">
          {credits.cast &&
            credits.cast.map((cast) => (
              <div
                key={cast.id}
                className="flex flex-col items-center justify-start border w-full rounded "
              >
                <img
                  src={`https://www.themoviedb.org/t/p/h632${cast.profile_path}`}
                  alt=""
                  className="w-full h-42 object-cover"
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

export default detalhe;
