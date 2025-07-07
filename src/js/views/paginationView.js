import View from "./view";

import icons from "url:../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClickButton(handler) {
        this._parentElement.addEventListener("click", (event) => {
            event.preventDefault;
            const button = event.target.closest(".btn--inline");
            if (!button) return;
            const goToPage = +button.dataset.buttonPage;
            handler(goToPage);
        });
    }

    _generateMarkup() {
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        if (currentPage === 1 && numPages > 1) {
            const buttonPage = currentPage + 1;
            return `
                <button data-button-page="${buttonPage}" class="btn--inline pagination__btn--next">
                    <span>Page ${buttonPage}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        if (currentPage === numPages && numPages > 1) {
            const buttonPage = currentPage - 1;
            return `
                <button data-button-page="${buttonPage}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${buttonPage}</span>
                </button>
            `;
        }
        if (currentPage < numPages) {
            const buttonPageLeft = currentPage - 1;
            const buttonPageRight = currentPage + 1;
            return `
                <button data-button-page="${buttonPageLeft}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${buttonPageLeft}</span>
                </button>
                <button data-button-page="${buttonPageRight}" class="btn--inline pagination__btn--next">
                    <span>Page ${buttonPageRight}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        return "";
    }
}

export default new PaginationView();
