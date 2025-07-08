import icons from "url:../../img/icons.svg";

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = newDOM.querySelectorAll("*");
        const currentElements = this._parentElement.querySelectorAll("*");

        newElements.forEach((newElement, index) => {
            const currentElement = currentElements[index];

            if (!newElement.isEqualNode(currentElement) && newElement?.firstChild.nodeValue.trim() !== "") {
                currentElement.textContent = newElement.textContent;
            }
            if (!newElement.isEqualNode(currentElement)) {
                Array.from(newElement.attributes).forEach((attribute) => {
                    currentElement.setAttribute(attribute.name, attribute.value);
                });
            }
        });
    }

    renderSpinner() {
        const markup = this._generateSpinnerMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    _generateSpinnerMarkup() {
        return `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
    }

    renderMessage(message = this._message) {
        const markup = this._generateMessageMarkup(message);
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    _generateMessageMarkup(message) {
        return `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}.svg#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
    }

    renderError(error = this._errorMessage) {
        const markup = this._generateErrorMarkup(error);
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    _generateErrorMarkup(error) {
        return `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}.svg#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${error}</p>
            </div>
        `;
    }

    _clear() {
        this._parentElement.innerHTML = "";
    }
}
