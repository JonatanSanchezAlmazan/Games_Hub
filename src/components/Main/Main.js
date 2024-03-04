import { arrayGames } from '../../utils/arrayGames';
import './Main.css'

export const renderMain = () => {
    const main = document.querySelector(".main");
    arrayGames.forEach((game) => {
        main.innerHTML += `
    <div class = "cardGame">
      <h2>${game.name}</h2>
      <img src = ${game.img}>
      <p>${game.description}</p>

    </div>
    
    `
    })

}