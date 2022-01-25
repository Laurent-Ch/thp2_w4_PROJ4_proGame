import { rawgKey } from "../rawgKey";

const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");
    const displayResults = (articles) => {
    let arrayImg = ['' ,'<i class="fab fa-windows" style="font-size:30px"></i>', '<i class="fab fa-playstation" style="font-size:30px"></i>', '<i class="fab fa-xbox" style="font-size:30px"></i>', '<i class="fab fa-app-store-ios" style="font-size:30px"></i>', '<i class="fab fa-apple" style="font-size:30px"></i>', '<i class="fab fa-linux" style="font-size:30px"></i>', '<i class="fab fa-nintendo-switch" style="font-size:30px"></i>', '<i class="fab fa-android" style="font-size:30px"></i>'];

    const resultsContent = articles.map((article) => (`
        <article class="cardGame">
          <img class="cardIcon" src="${article.background_image}" alt="game-illustration" />  
          <h1 class="gameTitle">${article.name}</h1>
          <div>${article.parent_platforms.map(e => arrayImg[e.platform.id]).join(' ')}</div>
        </article>
    `));
    const resultsContainer = document.querySelector(".page-list .articles");
    resultsContainer.innerHTML = resultsContent.join("\n");
  };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${rawgKey}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };
  render();
};

export { PageList };


