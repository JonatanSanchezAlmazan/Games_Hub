import { CreateButtons, disableBtn } from "../../components/Buttons/Buttons";
import { arrayCards } from "../../utils/arrayMemory";
import './Memory.css'

// Variables de apoyo
let points = 0;
let count = 0;
let card1;
let card2;
let isFinish = true;

// Función para renderizar el juego Memory
export const renderMemory = () => {
    points = 0;
    const main = document.querySelector(".main");
    main.innerHTML = "";
    const sectionContain = document.createElement("section");
    sectionContain.classList.add("containMemory");
    const sectionGame = document.createElement("section");
    sectionGame.classList.add("gameMemory");
    const sectionPoints = document.createElement("section");
    sectionPoints.classList.add("points");
    const h2Points = document.createElement("h2");
    const btnPpt = document.querySelector("#ppt");
    const btnMole = document.querySelector("#mole");
    const sectionBtn = document.createElement("section");
    sectionBtn.classList.add("start");
    const btnStartGame = CreateButtons("btnStart", "Start Game", "memory");
    const btnReset = CreateButtons("btnReset", "Reset Game", "reset");
    btnStartGame.addEventListener("click", () => {
        disableBtn(btnStartGame, true);
        disableBtn(btnReset, false);
        printCards(arrayCards);
    });
    btnReset.addEventListener("click", () => resetGame());
    sectionPoints.appendChild(h2Points);
    sectionContain.appendChild(sectionBtn);
    sectionBtn.appendChild(btnStartGame);
    sectionBtn.appendChild(btnReset);
    sectionContain.appendChild(sectionPoints);
    sectionContain.appendChild(sectionGame);
    main.appendChild(sectionContain);
    disableBtn(btnPpt, false);
    disableBtn(btnMole, false);

}

// Función que ordena y randomiza el array de cartas para que salgan aleatorias cada vez que juegas al juego.
const randomArrayCards = () => {
    arrayCards.sort(() => Math.random() - 0.5)
}

// Función para resetear los estilos de las cartas.
const resetCard = (card) => {
    card.nodoHTML.style.transition = "";
    card.nodoHTML.style.transform = "";
    card.nodoHTML.style.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/PAW_Patrol_Logo.png/220px-PAW_Patrol_Logo.png)";
    card.nodoHTML.style.backgroundColor = "#84e1bc";

}

// Función para resetear el valor de la variable count a 0.
const resetValue = () => {
    count = 0;
}

// Función encargada de comprobar si las cartas son iguales, si es asi suman un punto, resetean el contador a 0 y comprueban si todas las cartas estan descubiertas,
// rerstan un punto y a los 2 segundos llaman a la función resetCard para limpiar los estilos y resetean el valor del contador a 0.
const checkCard = () => {
    if (card1.dataCard.img === card2.dataCard.img) {
        card1.nodoHTML.classList.add("found");
        card2.nodoHTML.classList.add("found");
        points++;
        printPoints();
        resetValue();
    } else {
        points--;
        printPoints();
        setTimeout(() => {
            resetCard(card1);
            resetCard(card2);
            resetValue();

        }, 2000)
    }
    checkFinishGame();


}

// Función para pintar los puntos en el DOM.
const printPoints = () => {
    const h2Points = document.querySelector("h2");
    h2Points.textContent = points === 1 || points === -1 ? `${points} Punto` : `${points} Puntos`;
}

// Función para comprobar las cartas seleccionadas, se le pasa el div de cada carta y el dato de la carta, esta comprueba si la clase no es la found suma uno al contador, y aparte comprueba si el contador es menor a 3 le da la vuelta a la carta y le pone la imagen del div, aparte la función comprueba si el contador es igual a uno crea un objeto carta pasandole el div y los datos de la carta y de igual forma comprueba si el contador es igual a dos hace lo mismo con la otra carta y este llama a la función checkcard para comprobar si las dos cartas son iguales.
const selectCard = (divCard, dataCard) => {
    if (!divCard.classList.contains("found")) {
        count++
        if (count < 3) {
            divCard.style.transform = "rotateY(180deg)";
            divCard.style.transition = "transform 2s";
            setTimeout(() => {
                divCard.style.backgroundColor = "#fff";
                divCard.style.backgroundImage = `url(${dataCard.img})`;
            }, 600);
        }
        if (count === 1) {
            card1 = {
                nodoHTML: divCard,
                dataCard: dataCard
            };
        }
        if (count === 2) {
            card2 = {
                nodoHTML: divCard,
                dataCard: dataCard
            };
            checkCard();
        }

    }
}

// Función para pintar el array de cartas, selecciona la sección gameMemory y la limpía y también le quita el backgroundImage y el height que tiene por defecto, recorre el array y crea un div por cada carta, le añade la clase card y el mismo div tiene un escuchador de eventos que cuando le hacen click llama a la función selectCard.
const printCards = (array) => {
    const sectionGame = document.querySelector(".gameMemory");
    sectionGame.innerHTML = "";
    sectionGame.style.backgroundImage = "none";
    sectionGame.style.height = "none";
    randomArrayCards();
    array.forEach(dataCard => {
        const divCardNodoHTML = document.createElement("div");
        divCardNodoHTML.classList.add("card");
        divCardNodoHTML.addEventListener("click", () => selectCard(divCardNodoHTML, dataCard));
        sectionGame.appendChild(divCardNodoHTML);
    });
}

// Función encargada de resetear el juego, esat limpia tanto la sección de los puntos, la sección del juego, devuelve el valor de los puntos a 0, habilita el boton de startGame, deshabilita el de sertgame y vuelve a pintar el array de cartas.
const resetGame = () => {
    const btnReset = document.querySelector("#reset");
    const btnStartGame = document.querySelector("#memory");
    const sectionGame = document.querySelector(".gameMemory");
    const h2Points = document.querySelector("h2");
    sectionGame.innerHTML = "";
    h2Points.innerHTML = "";
    points = 0;
    disableBtn(btnStartGame, false);
    disableBtn(btnReset, true);
    printCards(arrayCards);

}

// Función encargada de comprobar si todas las cartas estan emparejadas, recorre todas las cartas y comprueba que tengan NO tengan la clase found para cambiarle el valor a false a la variable aisFinish, de lo contrario si todas las cartas tiene la clase found llama a la función printFinishGame.
const checkFinishGame = () => {
    const allCards = document.querySelectorAll(".card");
    isFinish = true;
    allCards.forEach(card => {
        if (!card.classList.contains("found")) {
            isFinish = false;
        }
    })
    if (isFinish) {
        printFinishGame();
    }

}

// Función para pintar el final del juego una vez todas las cartas estan emparejadas.
const printFinishGame = () => {
    const sectionGame = document.querySelector(".gameMemory");
    const h2Points = document.querySelector("h2");
    sectionGame.innerHTML = "";
    h2Points.innerHTML = "";
    sectionGame.innerHTML = `
    <h2>Lo conseguiste tu puntación ha sido de ${points} puntos</h2>
    <div class = "finish">
        <img src = /assets/finish.png>
    </div>
    
    `
}