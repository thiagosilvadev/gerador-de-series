import { getScreenshot } from "../../infra/getScreenshot";

const getHTML = ({ credits }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <style>
    body {
      margin: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Poppins", sans-serif;

      background-color: white;
      padding: .5vw;
    }

    h4 {
      font-size: 16px;
      font-weight: 600;
    }
    h5 {
      font-size: 18px;
      font-style: italic;
      font-weight: 500;
      color: #292929;
    }
    .grid {
      margin:auto;
      display: grid;
      grid-template-columns: repeat(${
        credits.cast.length < 16
          ? credits.cast.length >= 6
            ? 6
            : credits.cast.length
          : 6
      },1fr);
 
      width: 100vw;
      height: 100vh;
      gap: 10px;
      justify-content: flex-start;
      align-items:center;
      
    }
    h4,h5 {
      margin: 0;
    }
    img {
      width: 200px;
      height: 200px;

      border: 2px solid #3342d6;
      border-radius: 15px;
      object-fit: cover;
    }
    
  </style>
  <body>
    <div class="grid">
    ${credits.cast
      .slice(0, 18)
      .map(
        (cast) => `
      <div class="card">
    <img
    src="https://www.themoviedb.org/t/p/original${cast.profile_path}"
    alt=""
  />
  <h4>${cast.character}</h4>
  <h5>${cast.name}</h5>
    </div>`
      )
      .join("")} 
    </div>
  </body>
</html>
`;
};

export default async (req, res) => {
  const isHTMLDebugMode = false;

  // const responseSerie = await fetch(
  //   `${process.env.BASE_URL}/tv/${req.query.id}?api_key=${process.env.API_KEY}&language=en-US`
  // );
  // const jsonSerie = await responseSerie.json();
  const responseCredits = await fetch(
    `${process.env.BASE_URL}/tv/${req.query.id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );
  const jsonCredits = await responseCredits.json();

  const html = getHTML({
    credits: jsonCredits || "Adicione na URL: /id",
  });

  if (isHTMLDebugMode) {
    res.setHeader("Content-Type", "text/html");
    return res.end(html);
  }

  const file = await getScreenshot(html, { width: 1920, height: 1080 });

  res.setHeader("Content-Type", "image/png");
  res.end(file);
};
