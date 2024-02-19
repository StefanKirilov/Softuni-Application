import { memePreview } from "./common.js"
import { html } from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "../util.js"
import { getAllMemes } from "../data/services.js";

const myMemeTemplate = (memes) => html `
<section id="meme-feed">
<h1>All Memes</h1>
<div id="memes">
${memes.length===0 ? html `<p class="no-memes">No memes in database.</p>` :
 html `${memes.map(memePreview)}</div>
 </section>`}`

export async function myMemePage(ctx) {
    const memes = await getAllMemes();

    ctx.render(myMemeTemplate(memes))
}