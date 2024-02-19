import { deleteMeme, getMemeById } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
 import { getUserData } from '../util.js';

const detailsTemplate = (meme, isOwner, onDelete) => html `
<section id="meme-details">
<h1>Meme Title: ${meme.title}</h1>

<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>
        ${memeControlsTemplate(meme, isOwner, onDelete)}
    </div>
</div>
</section>`

const memeControlsTemplate = (meme, isOwner, onDelete) => {
    if (isOwner){
         return html`
        <div class="actionBtn">
             <a class="button warning" href="/edit/${meme._id}">Edit</a>
             <button @click=${onDelete} class="button danger">Delete</button>
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
    
    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId);

    const userId = getUserData()?._id;
    const isOwner = meme._ownerId === userId;
    

//     const donate = await getTotalDonatePet(petId);
//     const myDonate = await getTotalDonatePetFromUser(petId, userId);
//     const showDonateButton = (!isOwner && !myDonate && userId);
    

     ctx.render(detailsTemplate(meme, isOwner, onDelete));

     async function onDelete(){
         const confirmed = confirm(`Are you sure you want to delete ${meme.title}?`);
        if(confirmed) {
           await deleteMeme(memeId);
            ctx.page.redirect('/catalog');
     }
 }

//     async function onDonate(){
//             await donatePet(petId);
//             ctx.page.redirect(`/details/${petId}`);
//     }

}