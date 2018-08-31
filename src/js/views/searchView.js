import { elements } from './base';

// Input search and get the value
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

/* 
// E.g. - 'Pasta with tomato and spinach'
accu: 0 / acc + current.length = 5 / newTitle = ['Pasta']
accu: 5 / acc + current.length = 9 / newTitle = ['Pasta', 'with']
accu: 9 / acc + current.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
accu: 15 / acc + current.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
accu: 18 / acc + current.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
Stopped adding words after length > 17 
 */

const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];

	if (title.length > limit) {
		title.split(' ').reduce((accumulator, current) => {
			if (accumulator + current.length <= limit) {
				newTitle.push(current);
			}
			return accumulator + current.length;
		}, 0); //accumulator = 0

		//return the result
		return `${newTitle.join(' ')} ...`;
	}
	// else not needed to write here
	return title;
};

// Call each of the results
const renderRecipe = recipe => {
	const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
											recipe.title
										)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
	type === 'prev' ? page - 1 : page + 1
}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
							type === 'prev' ? 'left' : 'right'
						}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);

	let button;
	if (page === 1 && pages > 1) {
		// Show only the button to go to the next page
		button = createButton(page, 'next');
	} else if (page < pages) {
		// Show both buttons
		button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
	} else if (page === pages && pages > 1) {
		// Show only the button to go to the prev page
		button = createButton(page, 'prev');
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

// Loop through all the results and call renderRecipe function to call each of the results
/* 
Old function code:
export const renderResults = recipes => {
	//	console.log(recipes);
	recipes.forEach(renderRecipe);
};
 */

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	// render results of currente page
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	recipes.slice(start, end).forEach(renderRecipe);

	// render pagination buttons
	renderButtons(page, recipes.length, resPerPage);
};
