import { rawgKey } from "../rawgKey";

// The search is done by id, not by name. Makes things way simpler.
const PageDetail = (argument) => {
  let intro = document.querySelector('#mainpage-pitch');
  intro.innerHTML = '';
  
  let baseAddress = 'https://api.rawg.io/api/games'; 
  const preparePage = () => {

    const displayGame = (gameData) => {
      const { background_image, name, rating, ratings_count, description, released, developers, parent_platforms, publishers  } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector(".detail-image").src = background_image;
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector(".detail-rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector(".detail-released").innerHTML = `
      <div><strong>Release Date</strong>:</div>
      <div>${released}</div>`;

      articleDOM.querySelector(".detail-developers").innerHTML = `
      <div><strong>Developers</strong>:</div>
      <div>${developers.map(developer => developer.name).join(' ')}</div>`;

      articleDOM.querySelector(".detail-platforms").innerHTML = `
      <div><strong>Platforms</strong>:</div>
      <div>${parent_platforms.map(platformObj => platformObj.platform.name).join(' ')}`;

      articleDOM.querySelector(".detail-publishers").innerHTML = `
      <div><strong>Publishers</strong>:</div>
      <div>${publishers.map(publisher => publisher.name).join(' ')}`;
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
          <img class="detail-image" src"" alt="game-image"/>
          <div class=detail-top>
            <h1 class="title"></h1>
            <div class="detail-rating"></div>
          </div>
          <p class="description"></p>
          <div class='detail-info1'>
            <div class='detail-released'></div>
            <div class='detail-developers'></div>
            <div class='detail-platforms'></div>
            <div class='detail-publishers'></div>
          </div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };

// articleDOM.querySelector("p.release-date span").innerHTML = released;
// <p class="release-date">Release date : <span></span></p>