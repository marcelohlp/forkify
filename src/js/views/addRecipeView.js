import View from "./view";

import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
    _parentElement = document.querySelector(".upload");
    _message = "Recipe was successfully uploaded!";

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _buttonOpen = document.querySelector(".nav__btn--add-recipe");
    _buttonClose = document.querySelector(".btn--close-modal");

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHiddeWindow();
    }

    _addHandlerShowWindow() {
        this._buttonOpen.addEventListener("click", this.toggleWindow.bind(this));
    }

    _addHandlerHiddeWindow() {
        this._buttonClose.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const dataArray = [...new FormData(this._parentElement)];
            const data = Object.fromEntries(dataArray);
            handler(data);
        });
    }

    toggleWindow() {
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }

    _generateMarkup() {}
}

export default new AddRecipeView();
