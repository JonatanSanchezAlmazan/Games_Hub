import './Buttons.css'

// Función para crear botones
export const CreateButtons = (className, text, id) => {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;
    button.id = id || "";
    return button;
}

// Función para eliminar botones
export const removeBtn = (btn) => {
    btn.remove();
}

// Función para habilitar o deshabilitar botones.
export const disableBtn = (btn, value) => {
    btn.disabled = value
}