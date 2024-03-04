import './Buttons.css'

export const CreateButtons = (className, text, id) => {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;
    button.id = id || "";
    return button;
}

export const removeBtn = (btn) => {
    btn.remove();
}

export const disableBtn = (btn, value) => {
    btn.disabled = value
}