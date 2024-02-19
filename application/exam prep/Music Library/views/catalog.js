import { albumsPreview } from "./common.js"
import { html } from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "../util.js"
import { getAllAlbum } from "../data/services.js";

const myAlbumsTemplate = (albums) => html `
<section id="dashboard">
<h2>Albums</h2>
${albums.length > 0 ? html `
<ul class="card-wrapper">
${albums.map(albumsPreview)}
</ul>` : html ` <h2>There are no albums added yet.</h2>`}
 </section>`

export async function myCatalogPage(ctx) {
    const albums = await getAllAlbum();
    ctx.render(myAlbumsTemplate(albums))
}