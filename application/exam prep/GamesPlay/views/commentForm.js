import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler, getUserData } from '../util.js';
import { postComment } from '../data/services.js';

const formTemplate = (onSubmit) => html`
<article class="create-comment">
<label>Add new comment:</label>
<form @submit=${onSubmit} class="form">
    <textarea name="comment" placeholder="Comment......"></textarea>
    <input class="btn submit" type="submit" value="Add Comment">
</form>
</article>`

export function commentFormView(id){
    const user = getUserData();
    if(user) {
        const gameId = id;
        return formTemplate(createSubmitHandler(onSubmit(gameId)))
    } else {
        return nothing
    }


}

async function onSubmit(gameId , data) {


    await postComment({
        gameId,
        data
    });

    console.log(gameId , data);

    e.target.reset();

}
