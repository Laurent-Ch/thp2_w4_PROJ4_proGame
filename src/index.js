import "./styles.css";
import "./styles.scss";

import { routes } from './routes.js';

// Probably useless
import { Home } from './Home';
import { PageDetail } from './PageDetail';
import { PageList } from './PageList';

console.log("hello world!");

let pageArgument;
const setRoute = () => {
  const path = window.location.hash.substring(1).split('/');
  pageArgument = path[1] || '';

  const pageContent = document.getElementById('pageContent');
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener('hashchange', () => setRoute());
window.addEventListener('DOMContentLoaded', () => setRoute());
