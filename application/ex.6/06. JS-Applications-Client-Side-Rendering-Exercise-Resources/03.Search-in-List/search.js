import { render, html } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const cardTemplate = (towns) => html `${towns.map(town => html`<li id=${town}>${town}</li>`)}`

const renderTownsComponent = (towns) => {
   cardTemplate(towns);
   const rootElement = document.getElementById('towns');
   render(cardTemplate(towns), rootElement);
}

renderTownsComponent(towns);

document.querySelector('BUTTON').addEventListener('click', search);

const searchTown = (towns, text) => {
   return towns.filter(town => {
      if(town.includes(text)){
         const match = document.getElementById(`${town}`);
         match.setAttribute('class', 'active');
         return town;
      }
   });
}

function search(e) {

   const text = document.getElementById('searchText').value;

   const result = searchTown(towns, text);
   const resultHTML = document.getElementById('result');
   resultHTML.textContent = `${result.length} matches found`
   
}
