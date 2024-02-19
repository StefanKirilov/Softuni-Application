import { getMyCars } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
 import { getUserData } from '../util.js';

const detailsTemplate = (cars) => html `
<section id="my-listings">
<h1>My car listings</h1>
<div class="listings">
${cars.length===0 ? html `<p class="no-cars"> You haven't listed any cars yet.</p>` :
 html `${cars.map(carPreview)}   
</div>
</section>`}`

const carPreview = (car) => html`
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
    <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
    </div>
</div>
</div>
`

// const carControlsTemplate = (car, isOwner, onDelete) => {
//     if (isOwner){
//          return html`
//          <div class="listings-buttons">
//          <a href="/edit/${car._id}" class="button-list">Edit</a>
//          <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
//          </div>`
//     } else { 
//         return null
//      }
// };

// const donateControlsTemplate = (showDonateButton, onDonate) => {
//     if(showDonateButton) {
//         return html `
//         <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`
//     } else {
//          return null
//          }
// };


export async function myPage(ctx){
    
    const user = getUserData();
    const userId = user._id;
    const cars = await getMyCars(userId);

    

//     const donate = await getTotalDonatePet(petId);
//     const myDonate = await getTotalDonatePetFromUser(petId, userId);
//     const showDonateButton = (!isOwner && !myDonate && userId);
    

     ctx.render(detailsTemplate(cars));

//      async function onDelete(){
//          const confirmed = confirm(`Are you sure you want to delete ${car.model}?`);
//         if(confirmed) {
//            await deleteCar(carId);
//             ctx.page.redirect('/');
//      }
//  }

//     async function onDonate(){
//             await donatePet(petId);
//             ctx.page.redirect(`/details/${petId}`);
//     }

}