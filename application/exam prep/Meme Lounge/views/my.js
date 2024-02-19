import { getMyMemes } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from '../util.js';

// TODO Replace with actual view
const myTemplate = (user, memes) => html`
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
    <div class="user-content">
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>My memes count: ${memes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : 
      memes.map(myMemePreview)}

</div>
</section>
`;

export async function myPage(ctx) {

    const user = getUserData();
    const userId = user._id;
    const memes = await getMyMemes(userId);

    ctx.render(myTemplate(user, memes))
}

export const myMemePreview = (meme) => html`<div class="user-meme">
<p class="user-meme-title">${meme.title}</p>
<img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
<a class="button" href="/details/${meme._id}">Details</a>
</div>`