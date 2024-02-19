import { html } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import { createProduct } from '../data/services.js';

const createTemplate = (onSubmit) => html `
<section id="create">
<div class="form">
  <h2>Add item</h2>
  <form class="create-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
    />

    <button @click=${onSubmit} type="submit">post</button>
  </form>
</div>
</section>`

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(e){
        e.preventDefault();
        const brand = document.getElementById('shoe-brand').value;
        const model = document.getElementById('shoe-model').value;
        const imgUrl = document.getElementById('shoe-img').value;
        const release = document.getElementById('shoe-release').value;
        const designer = document.getElementById('shoe-designer').value;
        const value = document.getElementById('shoe-value').value;

        if(brand == "" || model == "" || imgUrl == "" || release == "" || designer == "" || value == "" ){
            return alert("All fields are required");
        }

        const data = {brand, model, imgUrl, release, designer, value};

       
        await createProduct(data);
        
        ctx.page.redirect("/catalog");
    }
}