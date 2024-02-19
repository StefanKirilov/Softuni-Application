import { albumPreview } from "./common.js"
import { html } from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "../util.js"
import { getAllAlbums } from "../data/services.js";

const myAlbumTemplate = (albums) => html `
<section id="catalogPage">
<h1>All Albums</h1>
${albums.length===0 ? html `<p>No Albums in Catalog!</p>` :
 html `${albums.map(albumPreview)}</ul>`}`

export async function myAlbumPage(ctx) {
    const albums = await getAllAlbums();

    console.log(albums);

    ctx.render(myAlbumTemplate(albums))
}