import { deleteCar, getCarById } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
 import { getUserData } from '../util.js';

const detailsTemplate = (car, isOwner, onDelete) => html `
<section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src=${car.imageUrl}>
    <hr>
    <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
    </ul>

    <p class="description-para">${car.description}</p>
    ${carControlsTemplate(car, isOwner, onDelete)}
</div>
</section>`

const carControlsTemplate = (car, isOwner, onDelete) => {
    if (isOwner){
         return html`
         <div class="listings-buttons">
         <a href="/edit/${car._id}" class="button-list">Edit</a>
         <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
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
    
    const carId = ctx.params.id;
    const car = await getCarById(carId);

    const userId = getUserData()?._id;
    const isOwner = car._ownerId === userId;
    

//     const donate = await getTotalDonatePet(petId);
//     const myDonate = await getTotalDonatePetFromUser(petId, userId);
//     const showDonateButton = (!isOwner && !myDonate && userId);
    

     ctx.render(detailsTemplate(car, isOwner, onDelete));

     async function onDelete(){
         const confirmed = confirm(`Are you sure you want to delete ${car.model}?`);
        if(confirmed) {
           await deleteCar(carId);
            ctx.page.redirect('/');
     }
 }

//     async function onDonate(){
//             await donatePet(petId);
//             ctx.page.redirect(`/details/${petId}`);
//     }

}