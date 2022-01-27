import "./styles.scss";
import { routes } from './routes.js';

const setRoute = () => {
  const path = window.location.hash.substring(1).split('/');
  const pageName = path[0];
  const pageArgument = path[1] || '';
  const pageArgumentPt2 = path[2] || '';
  const pageFunction = routes[pageName];
  pageFunction(pageArgument, pageArgumentPt2);
};

window.addEventListener('hashchange', () => setRoute());
window.addEventListener('DOMContentLoaded', () => setRoute());
