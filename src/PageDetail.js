import { rawgKey } from "../rawgKey";

// The search is done by id, not by name. Makes things way simpler.
const PageDetail = (argument) => {
  let baseAddress = 'https://api.rawg.io/api/games'; 
  const preparePage = () => {

    const displayGame = (gameData) => {
      const { name, released, description } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${rawgKey}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame(`${baseAddress}`, argument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };