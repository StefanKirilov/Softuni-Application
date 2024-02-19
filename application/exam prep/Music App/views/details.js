import { deleteAlbum, getAlbumById } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
 import { getUserData } from '../util.js';

const detailsTemplate = (album, isOwner, onDelete) => html `
<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src=${album.imgUrl}>
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${album.name}</h1>
            <h3>Artist: ${album.artist}e</h3>
            <h4>Genre: ${album.genre}</h4>
            <h4>Price: $${album.price}</h4>
            <h4>Date: ${album.releaseDate}</h4>
            <p>Description: ${album.description}</p>
        </div>
        ${albumControlsTemplate(album, isOwner, onDelete)}
    </div>
</div>
</section>`

const albumControlsTemplate = (album, isOwner, onDelete) => {
    if (isOwner){
         return html`
        <div class="actionBtn">
             <a href="/edit/${album._id}" class="edit">Edit</a>
             <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        </div>`
    } else { 
        return null
     }
};

// const donateControlsTemplate = (showDonateButton, onDonate) => {
//     if(showDonateButton) {
//         return html `
//         <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`
//     } else {
//          return null
//          }
// };


export async function detailsPage(ctx){
    
    const albumId = ctx.params.id;
    const album = await getAlbumById(albumId);

    const userId = getUserData()?._id;
    const isOwner = album._ownerId === userId;
    

//     const donate = await getTotalDonatePet(petId);
//     const myDonate = await getTotalDonatePetFromUser(petId, userId);
//     const showDonateButton = (!isOwner && !myDonate && userId);
    

     ctx.render(detailsTemplate(album, isOwner, onDelete));

     async function onDelete(){
         const confirmed = confirm(`Are you sure you want to delete ${album.name}?`);
        if(confirmed) {
           await deleteAlbum(albumId);
            ctx.page.redirect('/');
     }
 }

//     async function onDonate(){
//             await donatePet(petId);
//             ctx.page.redirect(`/details/${petId}`);
//     }

}