import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/detalhe.module.css";
import Head from "next/head";
const detalhe = () => {
  const router = useRouter();
  const [data, setData] = React.useState(null);
  // console.log(router.query);
  React.useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tv/${router.query.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => setData(json));
  }, [router.query]);

  const image = `/api/image-generator?id=${router.query.id}`;

  if (data == null) return null;
  console.log(data);
  return (
    <div className="container">
      <Head>
        <title>{data.original_name} | Gerador de Séries</title>
      </Head>
      <header className={styles.header}>
        <h1>Gerador de Séries</h1>
        <Link href="/">
          <a>voltar ao início</a>
        </Link>
      </header>
      <div className={styles.detail}>
        <h1 className={styles.name}>{data.original_name}</h1>
        <p>Sinopse: {data.overview}</p>
        <h4>Showrunner:</h4>
        {data.created_by != undefined &&
          data.created_by.map((creator) => (
            <p key={creator.id}>{creator.name}</p>
          ))}
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.load}>
          <h1>Carregando...</h1>
        </div>
        <img src={image} className={styles.image} alt="" />
      </div>
      <div className={styles.downloadArea}>
        <a href={image} target="_blank" download={data.original_name}>
          Baixar Imagem
        </a>
      </div>
    </div>
  );
};

export default detalhe;
