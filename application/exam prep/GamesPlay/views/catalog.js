import { gamePreview } from "./common.js"
import { html } from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "../util.js"
import { getAllGames } from "../data/services.js";

const myGameTemplate = (games) => html `
<section id="catalog-page">
<h1>All Games</h1>
${games.length===0 ? html `<h3 class="no-articles">No articles yet</h3>` :
 html `${games.map(gamePreview)}`}
 </section>`

export async function catalogPage(ctx) {

    const games = await getAllGames();
    ctx.render(myGameTemplate(games))
}