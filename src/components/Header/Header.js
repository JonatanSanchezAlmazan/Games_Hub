import { renderMemory } from '../../pages/Memory/Memory';
import { renderPpt } from '../../pages/PPT/Ppt';
import { renderWhac } from '../../pages/Whac-a-mole/Whac-a-mole';
import { CreateButtons } from '../Buttons/Buttons';
import './Header.css'

// Función para crear el Header.
export const Header = () => {
    const header = document.querySelector(".header");
    const btnGuac = CreateButtons("original-button", "Whac-a-mole", "mole");
    const btnPPT = CreateButtons("original-button", "Piedra Papel Tijera", "ppt");
    const btnMemory = CreateButtons("original-button", "Memory Game");
    btnGuac.addEventListener("click", renderWhac);
    btnPPT.addEventListener("click", renderPpt);
    btnMemory.addEventListener("click", renderMemory)
    header.append(btnGuac);
    header.append(btnPPT);
    header.append(btnMemory);
}