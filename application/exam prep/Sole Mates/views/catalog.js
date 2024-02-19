import { productPreview } from "./common.js"
import { html } from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "../util.js"
import { getAllProducts } from "../data/services.js";

const myProductsTemplate = (products) => html `
<section id="dashboard">
<h2>Collectibles</h2>
<ul class="card-wrapper">
${products.length===0 ? html `<h2>There are no items added yet.</h2>` :
 html `${products.map(productPreview)}
 </ul>
 </section>`}`

export async function catalogPage(ctx) {
    const products = await getAllProducts();

    ctx.render(myProductsTemplate(products))
}