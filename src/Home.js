import { PageList } from './PageList';
import { rawgKey } from '../rawgKey';

const Home = (argument = '') => {
  let intro = document.querySelector('#mainpage-pitch');
  intro.innerHTML =`<h2>Welcome,</h2>
  
  <p class="page-description">The Hyper Progame is the world\’s premier event for computer and video games and related products. At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure to the entire video game industry, all under one roof. This text seems familiar.</p>
  `;

  let default_arg = `games?key=${rawgKey}&dates=2021-06-01,2022-06-01&ordering=-added&page_size=9`;

  PageList(default_arg);
};

export { Home };