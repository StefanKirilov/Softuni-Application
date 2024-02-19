import { deleteProduct, getProductById } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
 import { getUserData } from '../util.js';

const detailsTemplate = (product, isOwner, onDelete) => html `
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src=${product.imageUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${product.brand}</span></p>
    <p>
      Model: <span id="details-model">${product.model}</span>
    </p>
    <p>Release date: <span id="details-release">${product.release}</span></p>
    <p>Designer: <span id="details-designer">${product.designer}</span></p>
    <p>Value: <span id="details-value">${product.value}</span></p>
  </div>
  ${productControlsTemplate(product, isOwner, onDelete)}
  </div>
  </section>`

const productControlsTemplate = (product, isOwner, onDelete) => {
    if (isOwner){
         return html`
         <div id="action-buttons">
         <a href="/edit/${product._id}" id="edit-btn">Edit</a>
         <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
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
    
    const productId = ctx.params.id;
    const product = await getProductById(productId);

    const userId = getUserData()?._id;
    const isOwner = product._ownerId === userId;
    

//     const donate = await getTotalDonatePet(petId);
//     const myDonate = await getTotalDonatePetFromUser(petId, userId);
//     const showDonateButton = (!isOwner && !myDonate && userId);
    

     ctx.render(detailsTemplate(product, isOwner, onDelete));

     async function onDelete(){
         const confirmed = confirm(`Are you sure you want to delete ${product.model}?`);
        if(confirmed) {
           await deleteProduct(productId);
            ctx.page.redirect('/');
     }
 }

//     async function onDonate(){
//             await donatePet(petId);
//             ctx.page.redirect(`/details/${petId}`);
//     }

}