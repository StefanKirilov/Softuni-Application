import { editProduct, getProductById } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (product, onSubmit) => html `
<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value=${product.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value=${product.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value=${product.imgUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value=${product.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      .value=${product.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      .value=${product.value}
    />

    <button @click=${onSubmit} type="submit">post</button>
  </form>
</div>
</section>`

        export async function editPage(ctx) {
            const productId = ctx.params.id;
            const product = await getProductById(productId);

            ctx.render(editTemplate(product, onSubmit));

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
        
                await editProduct(productId, {brand, model, imgUrl, release, designer, value});
                ctx.page.redirect(`/details/${productId}`);
            }
        }