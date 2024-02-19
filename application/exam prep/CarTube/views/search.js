import { searchCar } from '../data/services.js';
import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler, getUserData } from '../util.js';

const searchTemplate = (isClicked, handler, cars, userId) => html `
<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button @click=${handler} class="button-list">Search</button>
</div>

<h2>Results:</h2>
<div class="listings">
${isClicked ? createResultTemplate(cars, userId)
    : nothing}
</div>
</section>`

const createResultTemplate = (cars, userId) =>{
     return html `
${cars.length > 0 ? html `${cars.map(car => createCard(car, userId))}`:
                      html`<p class="no-cars"> No results.</p>`}`}


const createCard = (car, userId) => html`
<div class="listing">
<div class="preview">
    <img src=${car.imageUrl}>
</div>
<h2>${car.brand} ${car.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    ${userId ? html`
    <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
    </div>
</div>`  : nothing}
</div>`

export async function searchPage(ctx) {

    ctx.render(searchTemplate(false, onSearch));

    async function onSearch(e){
        e.preventDefault();
        const searchTerm = document.querySelector('#search-input').value;
        if(!searchTerm){
            return alert('enter text');
        }
        const albums = await searchCar(searchTerm);
        const userId = getUserData()?._id;
        

        ctx.render(searchTemplate(true, onSearch, albums, userId));
        
        
    }
    // ctx.page.redirect(`/search/${searchTerm}`);
}