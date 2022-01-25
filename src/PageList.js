import { rawgKey } from "../rawgKey";

const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (`
          <article class="cardGame">
            <img class="cardIcon" src="${article.background_image}" alt="game-illustration" />  
            <h1>${article.name}</h1>
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


