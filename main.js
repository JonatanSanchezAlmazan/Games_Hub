import { Header } from './src/components/Header/Header';
import { renderMain } from './src/components/Main/Main';
import './style.css'

const divApp = document.querySelector("#app");

divApp.innerHTML = `
<header class ="header"></header>
<main class="main"></main>
`

Header();
renderMain();