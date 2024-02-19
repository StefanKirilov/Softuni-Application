import { searchAlbum } from '../data/services.js';
import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler, getUserData } from '../util.js';

const searchTemplate = (isClicked, handler, albums, userId) => html `
<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click=${handler} class="button-list">Search</button>
</div>

<h2>Results:</h2>
<div class="search-result">
${isClicked ? createResultTemplate(albums, userId)
: nothing}
</div>
</section>`

const createResultTemplate = (albums, userId) =>{
     return html `
${albums.length > 0 ? html `${albums.map(album => createCard(album, userId))}`:
                      html`<p class="no-result">No result.</p>`}`}


const createCard = (album, userId) => html`
<div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${userId ? html`
            <div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
            </div>` : nothing}
        </div>`

export async function searchPage(ctx) {

    ctx.render(searchTemplate(false, onSearch));

    async function onSearch(e){
        e.preventDefault();
        const searchTerm = document.querySelector('#search-input').value;
        if(!searchTerm){
            return alert('enter text');
        }
        const albums = await searchAlbum(searchTerm);
        const userId = getUserData()?._id;
        

        ctx.render(searchTemplate(true, onSearch, albums, userId));
        
        
    }
    // ctx.page.redirect(`/search/${searchTerm}`);
}