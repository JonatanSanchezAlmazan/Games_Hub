import { CreateButtons, disableBtn, removeBtn } from '../../components/Buttons/Buttons';
import { arrayMole } from '../../utils/arrayMoles';
import './Whac-a-mole.css'

let interval;
let moleCount;
let count = 0;
let arrayImages;
let timeInterval;
let isPaused = false;

export const renderWhac = () => {
    count = 0;
    const main = document.querySelector(".main");
    main.innerHTML = "";
    const sectionContain = document.createElement("section");
    sectionContain.classList.add("contain");
    const sectionGame = document.createElement("section");
    sectionGame.classList.add("game");
    const sectionBtn = document.createElement("section");
    sectionBtn.classList.add("start");
    const sectionPoints = document.createElement("section");
    sectionPoints.classList.add("points");
    const h2Points = document.createElement("h2");
    const sectionPaused = document.createElement("section");
    sectionPaused.classList.add("paused");
    const btnStartGame = CreateButtons("btnStart", "Start Game", "whac");
    const btnPausedGame = CreateButtons("btnPaused", "Paused Game");
    const btnResetGame = CreateButtons("btnReset", "Reset Game");
    const btnMole = document.querySelector("#mole");
    const btnPpt = document.querySelector("#ppt");
    btnStartGame.addEventListener("click", () => startGame());
    btnPausedGame.addEventListener("click", () => pausedGame());
    btnResetGame.addEventListener("click", () => resetGame());
    sectionBtn.appendChild(btnStartGame);
    sectionBtn.appendChild(btnPausedGame);
    sectionBtn.appendChild(btnResetGame);
    sectionContain.appendChild(sectionBtn);
    sectionPoints.appendChild(h2Points);
    sectionContain.appendChild(sectionPoints);
    sectionContain.appendChild(sectionPaused);
    sectionContain.appendChild(sectionGame);
    main.appendChild(sectionContain);
    disableBtn(btnMole, true);
    disableBtn(btnPpt, false);
}

const createArrayMole = (array) => {
    const sectionGame = document.querySelector(".game");
    for (let i = 0; i < array.length; i++) {
        const divImg = document.createElement("div");
        divImg.classList.add("divImg");
        const img = document.createElement("img");
        img.src = "/hole.webp";
        img.id = i;
        divImg.appendChild(img);
        sectionGame.appendChild(divImg);

    }
    return sectionGame;
}
const updateInterval = () => {
    if (count >= 10) {
        timeInterval = 1000;
    }
    if (count >= 20) {
        timeInterval = 800;
    }
    if (count >= 30) {
        timeInterval = 700;
    }
    if (count >= 40) {
        timeInterval = 600;
    }
    if (count >= 50) {
        timeInterval = 500;
    }
    if (count >= 60) {
        timeInterval = 400;
    }
    if (count >= 90) {
        timeInterval = 300;
    }
    if (count >= 120) {
        timeInterval = 200;
    }
}
const gameLoop = () => {
    if (!isPaused) {
        let random = Math.floor(Math.random() * arrayImages.length);
        let image;
        let previousRandom = -1;
        let randomRepeat;
        do {
            randomRepeat = Math.floor(Math.random() * arrayImages.length);
        } while (randomRepeat === random || randomRepeat === previousRandom);

        previousRandom = random;
        image = arrayImages[randomRepeat];

        image.src = "/mole.webp";

        image.addEventListener("click", () => checkReverseImage(image));

        moleCount = countMoles(arrayImages);
        if (moleCount > 8) {
            clearInterval(interval);
            gameOver(count);
            return;
        }

        updateInterval();
    }

    interval = setTimeout(gameLoop, timeInterval);
}

const initGame = () => {
    arrayImages = document.querySelectorAll("img");
    timeInterval = 2000;
    interval = setTimeout(gameLoop, timeInterval);

}

const checkReverseImage = (image) => {
    if (!isPaused) {
        const img = image.src.split("/").slice(-1).join("");
        if (img === "mole.webp") {
            count++
            image.src = "/hole.webp";
            renderSumPoints(count);
        }
    }

}

const countMoles = (arrayImages) => {
    let count = 0;
    for (let i = 0; i < arrayImages.length; i++) {
        if (arrayImages[i].src.split("/").slice(-1).join("") === "mole.webp") {
            count++
        }
    }
    return count;
}

const renderSumPoints = (number) => {
    const points = document.querySelector("h2");
    points.innerHTML = number == 1 ? `${number} Punto ` : `${number} Puntos`;

}

const pausedGame = () => {
    isPaused = true;
    if (arrayImages) {
        arrayImages.forEach(image => {
            image.removeEventListener("click", checkReverseImage);
        })
    }
    clearInterval(interval);
    const sectionPaused = document.querySelector(".paused");
    const btnPausedGame = document.querySelector(".btnPaused");
    disableBtn(btnPausedGame, true);
    const p = document.createElement("p");
    p.textContent = "Juego pausado";
    sectionPaused.appendChild(p);


}

const resetGame = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    count = 0;
    renderWhac();
}

const startGame = () => {
    const sectionGame = document.querySelector(".game");
    sectionGame.style.backgroundImage = "none";
    sectionGame.style.height = "auto";
    const h2Points = document.querySelector("h2");
    h2Points.textContent = `${count} Puntos`;
    isPaused = false;
    const btnPaused = document.querySelector(".btnPaused");
    const sectionPaused = document.querySelector(".paused");
    sectionPaused.innerHTML = "";
    disableBtn(btnPaused, false);
    createArrayMole(arrayMole);
    initGame();
}

const gameOver = (points) => {
    const main = document.querySelector("main");
    const sectionGame = document.querySelector(".game");
    const btnStartGame = document.querySelector(".btnStart");
    const btnPaused = document.querySelector(".btnPaused");
    sectionGame.innerHTML = "";
    const sectionGameOver = document.createElement("section");
    sectionGameOver.classList.add("sectionGameOver");
    sectionGameOver.innerHTML = `
    <div class = "gameOver">
            <h3>Game Over has conseguido ${points} puntos</h3>  
            <img src = "/moleGameOver.webp">             
    </div>`
    removeBtn(btnStartGame);
    removeBtn(btnPaused);
    main.appendChild(sectionGameOver);
}