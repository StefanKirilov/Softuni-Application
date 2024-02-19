import { deleteGame, getByGameId, getGameById } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
 import { getUserData } from '../util.js';
import { commentFormView } from './commentForm.js';
import { commentsView } from './comments.js';

const detailsTemplate = (game, commentSection ,commentFormSections, isOwner, onDelete) => html `
<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src=${game.imageUrl} />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
    </div>

    <p class="text">${game.summary}</p>

    ${commentSection}

    <div class="buttons">
    ${gameControlsTemplate(game, isOwner, onDelete)}
    </div>
</div>
${commentFormSections}
</section>`

const gameControlsTemplate = (game, isOwner, onDelete) => {
    if (isOwner){
         return html`
         <a href="/edit/${game._id}" class="button">Edit</a>
         <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>`
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
    
    const gameId = ctx.params.id;
    // const game = await getGameById(gameId);
    const [game, commentSection] = await Promise.all([
        getGameById(gameId),
        commentsView(gameId)
    ])
    
    const commentFormSections = commentFormView(gameId);
    
    const userId = getUserData()?._id;
    const isOwner = game._ownerId === userId;
    

    // const donate = await getTotalDonatePet(petId);
    // const myDonate = await getTotalDonatePetFromUser(petId, userId);
    // const showDonateButton = (!isOwner && !myDonate && userId);
    
     ctx.render(detailsTemplate(game, commentSection ,commentFormSections, isOwner, onDelete));

     async function onDelete(){
         const confirmed = confirm(`Are you sure you want to delete ${game.title}?`);
        if(confirmed) {

           await deleteGame(gameId);
            ctx.page.redirect('/');
     }
 }

    // async function onDonate(){
    //         await donatePet(petId);
    //         ctx.page.redirect(`/details/${petId}`);
    // }

}