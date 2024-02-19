import { html } from '../node_modules/lit-html/lit-html.js';

// TODO replace with actual layout
export const layoutTemplate = (userData, content) => html `
<section id="notifications">
    <div id="errorBox" class="notification">
        <span>MESSAGE</span>
    </div>
</section>

<nav>
    <a href="/catalog">All Memes</a>
    ${userData ? html`
<div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${userData.email}</span>
        <a href="/my">My Profile</a>
        <a href="/logout">Logout</a>
    </div>
</div>` : html `
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/">Home Page</a>
</div>`}
</nav>

<!-- Main Content -->
<main>
${content}
</main>

<footer class="footer">
<p>Created by SoftUni Delivery Team</p>
</footer>
`;