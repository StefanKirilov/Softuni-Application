import { carPreview } from "./common.js"
import { html } from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "../util.js"
import { getAllCars } from "../data/services.js";

const myCarTemplate = (cars) => html `
<section id="car-listings">
<h1>Car Listings</h1>
<div class="listings">
${cars.length===0 ? html `<p class="no-cars">No cars in database.</p>` :
 html `${cars.map(carPreview)}
 </div>
 </section>`}`

export async function allCarPage(ctx) {
    const cars = await getAllCars();

    ctx.render(myCarTemplate(cars))
}