import { petsPreview } from "./common.js"
import { html } from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "../util.js"
import { getAllPets } from "../data/services.js";

const myPetsTemplate = (pets) => html `
<section id="dashboard">
<h2 class="dashboard-title">Services for every animal</h2>
${pets.length===0 ? html `<div>
<p class="no-pets">No pets in dashboard</p>
</div>` :
 html `<div class="animals-dashboard">
 ${pets.map(petsPreview)}</ul>`}
</section>`

export async function myPetsPage(ctx) {
    const userData = getUserData();
    const pets = await getAllPets(userData._id);
    ctx.render(myPetsTemplate(pets))
}