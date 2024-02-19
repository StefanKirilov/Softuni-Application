import { html } from '../node_modules/lit-html/lit-html.js';

// TODO replace with actual layout
export const layoutTemplate = (userData, content) => html `
<header>
<nav>
    <a class="active" href="/">Home</a>
    <a href="/catalog">All Listings</a>
    <a href="/year">By Year</a>
    ${userData ? html`<div id="profile">
    <a>Welcome ${userData.username}</a>
    <a href="/my">My Listings</a>
    <a href="/create">Create Listing</a>
    <a href="/logout">Logout</a>
     </div>` :
      html `<div id="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
  </div>`}
</nav>
</header>
<main id="site-content">
${content}
</main>
<footer>
<p>&copy; All rights reserved</p>
</footer>

`;