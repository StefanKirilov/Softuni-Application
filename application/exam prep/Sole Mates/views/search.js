import { searchProduct } from '../data/services.js';
import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler, getUserData } from '../util.js';

const searchTemplate = (isClicked, handler, cars, userId) => html `
<section id="search">
<h2>Search by Brand</h2>

<form class="search-wrapper cf">
  <input
    id="#search-input"
    type="text"
    name="search"
    placeholder="Search here..."
    required
  />
  <button @click=${handler} type="submit">Search</button>
</form>

<h3>Results:</h3>

<div id="search-container">

  ${isClicked ? createResultTemplate(cars, userId)
    : nothing}

</div>
</section>`

const createResultTemplate = (products, userId) =>{
     return html `
${products.length > 0 ? html `<ul class="card-wrapper">${products.map(product => createCard(product, userId))} </ul>`:
                      html`<h2>There are no results found.</h2>`}`}


const createCard = (product, userId) => html`
<li class="card">
<img src=${product.imageUrl} alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${product.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${product.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${product.value}</span>$</p>
${userId ? html`
<a class="details-btn" href="/details/${product._id}">Details</a>` : nothing}
</li>`

export async function searchPage(ctx) {

    ctx.render(searchTemplate(false, onSearch));

    async function onSearch(e){
        e.preventDefault();
        const searchTerm = document.getElementById('#search-input').value;
        if(!searchTerm){
            return alert('enter text');
        }
        
        const product = await searchProduct(searchTerm);
        const userId = getUserData()?._id;

        ctx.render(searchTemplate(true, onSearch, product, userId));
        
    }
    // ctx.page.redirect(`/search/${searchTerm}`);
}