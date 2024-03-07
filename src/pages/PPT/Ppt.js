import { CreateButtons, disableBtn } from '../../components/Buttons/Buttons';
import { arrayPpt } from '../../utils/arrayPpt';
import './Ppt.css'

// Variables de apoyo
let count = 0;
let points = 0;
let userOption = null;
let isResult = false;
let isEmpty = true;

// Función encargada de renderizar el juego de piedra papel o tijera.
export const renderPpt = () => {
    points = 0;
    const main = document.querySelector(".main");
    main.innerHTML = "";
    const sectionContain = document.createElement("section");
    sectionContain.classList.add("containPpt");
    const sectionGame = document.createElement("section");
    sectionGame.classList.add("gamePpt");
    const sectionPoints = document.createElement("section");
    sectionPoints.classList.add("points");
    const h2Points = document.createElement("h2");
    const btnPpt = document.querySelector("#ppt");
    const btnMole = document.querySelector("#mole");
    const sectionBtn = document.createElement("section");
    sectionBtn.classList.add("start");
    const sectionResult = document.createElement("section");
    sectionResult.classList.add("result");
    const btnStartGame = CreateButtons("btnStart", "Start Game", "ppt");
    const btnEmptyGame = CreateButtons("btnStart", "Empty Game", "empty");
    btnStartGame.addEventListener("click", () => {
        disableBtn(btnStartGame, true);
        if (!isResult) {
            sectionContain.appendChild(sectionResult);
            printPpt();
        }

    });
    btnEmptyGame.addEventListener("click", () => {
        if (isEmpty) {
            initGame();
        }

    });
    sectionPoints.appendChild(h2Points);
    sectionContain.appendChild(sectionBtn);
    sectionBtn.appendChild(btnStartGame);
    sectionBtn.appendChild(btnEmptyGame);
    sectionContain.appendChild(sectionPoints);
    sectionContain.appendChild(sectionGame);
    main.appendChild(sectionContain);
    disableBtn(btnPpt, true);
    disableBtn(btnMole, false);
}

// Función encargada de renderizar la sección del resultado y renderizar las tres opciones o piedra o papel o tijera, esta función llama a la función optionUser.
const printPpt = () => {
    const sectionGame = document.querySelector(".gamePpt");
    const sectionResult = document.querySelector(".result");
    sectionResult.style.border = "2px solid #014737";
    sectionGame.style.backgroundImage = "none";
    sectionGame.style.height = "auto";
    for (const key in arrayPpt) {
        const element = arrayPpt[key];
        const img = document.createElement("img");
        img.src = element.img;
        sectionGame.appendChild(img);
    }
    optionUser();
}

// Función encargada de de renderizar la opción del usuario.
const optionUser = () => {
    const gamePpt = document.querySelector(".gamePpt").querySelectorAll("img");
    const btnEmptyGame = document.querySelector("#empty");
    const sectionResult = document.querySelector(".result");
    gamePpt.forEach((img) => {
        img.addEventListener("click", () => {
            if (count === 0) {
                isEmpty = true;
                btnEmptyGame.disabled = false;
                sectionResult.innerHTML = `
                <div class = vs>
                    <img src = /assets/${img.src.split("/").splice(-1).join("")}>
                    <p>VS</p>
                </div>
                
                `
                userOption = img.src.split("/").splice(-1).join("").split(".")[0];
                count++;
            }
        })
    })

}

// Función encargada de coger una opción random del array de piedra papel o tijera y retornar el nombre.
const optionPc = () => {
    const random = Math.floor(Math.random() * arrayPpt.length);
    const name = arrayPpt[random].name;
    return name;
}

// Función encargada de comparar para ver quien es el ganador si el usuario o el pc.
const winner = (optionUser, optionPc) => {
        const h2Points = document.querySelector("h2");
        if (optionUser === optionPc) {
            points = points;
            h2Points.textContent = `${points === -1 || points === 1  ? `${points} Punto` : `${points} Puntos`}`;
        return "Empate";

    } else if (
        (optionUser === "piedra" && optionPc === "tijera") ||
        (optionUser === "papel" && optionPc === "piedra") ||
        (optionUser === "tijera" && optionPc === "papel")
    ) {
        points++;
        h2Points.textContent = `${points === -1 || points === 1  ? `${points} Punto` : `${points} Puntos`}`;

        return "Has Ganado!!!";
    } else {

        points--;
        h2Points.textContent = `${points === -1 || points === 1  ? `${points} Punto` : `${points} Puntos`}`;
        return "Has perdido!!!";
    }

};

// Función encargada de inicializar el juego
const initGame = () => {
    
    const sectionResult = document.querySelector(".result");
    const btnStartGame = document.querySelector(".btnStart");
    const divVs = document.querySelector(".vs");
    const gamePpt = document.querySelector(".gamePpt");
    gamePpt.innerHTML = "";
    let p = document.createElement("p");
    const optionComputer = optionPc();
    printPpt();
    if (divVs === null) {
        p.textContent = "Debes escoger una opción para poder jugar";
        disableBtn(btnStartGame, true);

    } else {
        isEmpty = false;
        const image = document.createElement("img");
        image.src = `/assets/${optionComputer}.png`;
        image.classList.add("rotatedImage");
        divVs.appendChild(image);
        image.offsetWidth;
        image.style.transform = "rotate(360deg)";
    }
    const optionUser = userOption;
    if (optionUser) {
        
        setTimeout(() => {
            const result = winner(optionUser, optionComputer);
            p.textContent = `${result}`;
            count = 0;
            disableBtn(btnStartGame, true);
        }, 2000);
    }
    sectionResult.appendChild(p);
}