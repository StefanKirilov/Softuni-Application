import { html } from '../node_modules/lit-html/lit-html.js';

export const productPreview = (product) => html`<li class="card">
<img src=${product.imageUrl} alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${product.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${product.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${product.value}</span>$</p>
<a class="details-btn" href="/details/${product._id}">Details</a>
</li>`