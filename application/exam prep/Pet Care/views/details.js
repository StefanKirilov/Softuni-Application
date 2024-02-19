 import { deletePet, donatePet, getPetsById, getTotalDonatePet, getTotalDonatePetFromUser} from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
 import { getUserData } from '../util.js';

const detailsTemplate = (pet, isOwner, onDelete, showDonateButton, donate, onDonate) => html `
<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${pet.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: ${donate}$</h4>
        </div>
        <div class="actionBtn">
        ${petControlsTemplate(pet, isOwner, onDelete)}

        ${donateControlsTemplate(showDonateButton, onDonate)}
        </div>
    </div>
</div>
</section>`

const petControlsTemplate = (pet, isOwner, onDelete) => {
    if (isOwner){
         return html`
        <a href="/edit/${pet._id}" class="edit">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
    } else { 
        return null
     }
};

const donateControlsTemplate = (showDonateButton, onDonate) => {
    if(showDonateButton) {
        return html `
        <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`
    } else {
         return null
         }
};


export async function detailsPage(ctx){
    
    const petId = ctx.params.id;
    const pet = await getPetsById(petId);

    const userId = getUserData()?._id;
    const isOwner = pet._ownerId === userId;
    

    const donate = await getTotalDonatePet(petId);
    const myDonate = await getTotalDonatePetFromUser(petId, userId);
    const showDonateButton = (!isOwner && !myDonate && userId);
    

     ctx.render(detailsTemplate(pet, isOwner, onDelete, showDonateButton, donate, onDonate));

     async function onDelete(){
         const confirmed = confirm(`Are you sure you want to delete ${pet.name}?`);
        if(confirmed) {
            console.log(petId);
           await deletePet(petId);
            ctx.page.redirect('/');
     }
 }

    async function onDonate(){
            await donatePet(petId);
            ctx.page.redirect(`/details/${petId}`);
    }

}