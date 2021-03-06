import { rawgKey } from "../rawgKey";

// The search is done by id, not by name. Makes things way simpler.
const PageDetail = (argument) => {
  // const cleanedArgument = argument.trim().replace(/\s+/g, '-');

  let intro = document.querySelector('#mainpage-pitch');
  intro.innerHTML = '';
  let baseAddress = 'https://api.rawg.io/api/games'; 
  const preparePage = () => {

    // Issues
    // <div>${parent_platforms.map(elt => `<a class="special-pagelist-link" href="#pagelist/&platforms=${elt.platform.id}">${elt.platform.name}</a>`).join(', ')}</div>`;

    const displayGame = (gameData) => {
      const { background_image, website, name, rating, ratings_count, description, released, developers, parent_platforms, publishers, genres, tags } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      // Top part.
      articleDOM.querySelector(".detail-image").src = background_image;
      
      articleDOM.querySelector(".website-button").innerHTML = `
      <a class="website-link" href='${website}'>Check Website <i class="fas fa-play play-icon"></i></a>`;
      
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector(".detail-rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
      articleDOM.querySelector("p.description").innerHTML = description;
      
      // First additional info row.
      articleDOM.querySelector(".detail-released").innerHTML = `
      <div><strong>Release Date</strong></div>
      <div>${released}</div>`;

      articleDOM.querySelector(".detail-developers").innerHTML = `
      <div><strong>Developers</strong></div>
      <div>${developers.map(developer => `<a class="special-pagelist-link" href="#pagelist/&developers=${developer.id}">${developer.name}</a>`).join(', ')}</div>`;
      
      articleDOM.querySelector(".detail-platforms").innerHTML = `
      <div><strong>Platforms</strong></div>
      <div>${parent_platforms.map(elt => `<a class="special-pagelist-link" href="#pagelist/&parent_platforms=${elt.platform.id}">${elt.platform.name}</a>`).join(', ')}</div>`;
      
      articleDOM.querySelector(".detail-publishers").innerHTML = `
      <div><strong>Publishers</strong></div>
      <div>${publishers.map(publisher => `<a class="special-pagelist-link" href="#pagelist/&publishers=${publisher.id}">${publisher.name}</a>`).join(', ')}</div>`;

      // Second additional info row.
      articleDOM.querySelector(".detail-genre").innerHTML = `
      <div><strong>Genres</strong></div>
      <div>${genres.map(genre => `<a class="special-pagelist-link" href="#pagelist/&genres=${genre.id}">${genre.name}</a>`).join(', ')}</div>`;

      articleDOM.querySelector(".detail-tags").innerHTML = `
      <div><strong>Tags</strong></div>
      <div>${tags.map(tag => `<a class="special-pagelist-link" href="#pagelist/&tags=${tag.id}">${tag.name}</a>`).join(', ')}</div>`;

      // Screenshots.
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
          <button type='button' class='website-button'></button>
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
          <div class='detail-info2'>
            <div class='detail-genre'></div>
            <div class='detail-tags'></div>
        </div>
        </div>
      </section>
      <h2 class="main-title">Screenshots
      </h2>
      <div class="screenshots-container></div>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };
