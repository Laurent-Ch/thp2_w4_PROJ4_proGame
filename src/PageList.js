import { rawgKey } from "../rawgKey";

const PageList = (argument, argumentPt2) => {
  let searchTerm;
  let userSearched = false;
  let baseAddress = 'https://api.rawg.io/api/'; 
  let numberOfLoadedPages = 1;
  let resultsContainer;

  const displayResults = (articles, isShowMore = false) => {
    let arrayImg = ['' ,'<i class="fab fa-windows" style="font-size:30px"></i>', '<i class="fab fa-playstation" style="font-size:30px"></i>', '<i class="fab fa-xbox" style="font-size:30px"></i>', '<i class="fab fa-app-store-ios" style="font-size:30px"></i>', '<i class="fab fa-apple" style="font-size:30px"></i>', '<i class="fab fa-linux" style="font-size:30px"></i>', '<i class="fab fa-nintendo-switch" style="font-size:30px"></i>', '<i class="fab fa-android" style="font-size:30px"></i>'];
    
    const resultsContent = articles.results.map((article) => (`
        <article class="cardGame">
          <div class = "div-img">
            <img class="cardIcon" src="${article.background_image}" alt="game-illustration" />
            <div class='revealed-on-hover'>
              <div class='hover-elt'>Released on: ${article.released}</div>  
              <div class='hover-elt'>Rating: ${article.rating}, ${article.ratings_count} votes</div>
              <div class='hover-elt'>Genre: ${article.genres.map(genre => ` ${genre.name}`)}</div>
            </div>  
          </div>
          <h1 class="gameTitle"><a class="game-link" href="#pagedetail/${article.id}">${article.name}</a></h1>
          <div>${article.parent_platforms.map(e => arrayImg[e.platform.id]).join(' ')}</div>
        </article>
    `));
    
    if (isShowMore == false) {
      resultsContainer.innerHTML = resultsContent.join("\n");
    } else {
      resultsContainer.innerHTML += resultsContent.join("\n");
    }
  };

  const fetchList = (url, argument, isShowMore = false) => {
    const finalURL = argument ? `${url}${argument}/${argumentPt2}?key=${rawgKey}` : url;
    fetch(finalURL)
      .then((response) => response.json())
      .then((responseData) => {
        displayResults(responseData, isShowMore);
      });
  };
  
  const preparePage = () => {
    resultsContainer = document.querySelector(".page-list .articles");

    // Recovering the user search and transfering it when necessary
    let searchBar = document.querySelector('.searchbar');
    const btnShowMoreTotallyDifferent = document.querySelector('.show-more-button');
    searchBar.addEventListener('keypress', e => {
      if (e.key == 'Enter') {
        userSearched = true;
        e.preventDefault();
        btnShowMoreTotallyDifferent.style.display='block';
        numberOfLoadedPages = 1;
        resultsContainer.innerHTML = '';
        searchTerm = searchBar.value.trim().replace(/\s+/g, "-");
        fetchList(`${baseAddress}games?key=${rawgKey}&page_size=9&search=`, searchTerm);
      }
    });
  
    fetchList(baseAddress, argument);
    // games?key=${rawgKey}&dates=2021-06-01,2022-06-01&ordering=-added&page_size=9`);
  };

  const handleShowBtn = () => {
    const btnShowMore = document.querySelector('.show-more-button');
    btnShowMore.addEventListener('click', () => {
      numberOfLoadedPages++;
      if(numberOfLoadedPages >= 3 ){
        btnShowMore.style.display='none';
      }
      if (userSearched == true ) {
        fetchList(`${baseAddress}games?key=${rawgKey}&page_size=9&page=${numberOfLoadedPages}&search=`, searchTerm, true);
        
      }
      else {
      fetchList(`${baseAddress}games?key=${rawgKey}&dates=2021-06-01,2022-06-01&ordering=-added&page_size=9&page=${numberOfLoadedPages}`, searchTerm, true);
      }
    });
  }

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
      <div class='btn-show-more-container'>  
        <button type='button' class='show-more-button'>Show More</button>
      </div>
    `
    handleShowBtn();
    preparePage();
  };

  render();
};

export { PageList };


