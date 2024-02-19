import { render, html } from "../node_modules/lit-html/lit-html.js";

const tbody = document.querySelector('tbody');
const input = document.querySelector('#searchField');
const btn = document.querySelector('#searchBtn');

btn.addEventListener('click', onClick);


getData();

async function getData() {
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   update(Object.values(data).map(d => createLine(d)));
}

function update(line) {
    render(line, tbody)
}

function createLine(line) {
   const template = html `
   <tr>
   <td>${line.firstName} ${line.lastName}</td>
   <td>${line.email}</td>
   <td>${line.course}</td>
   </tr> `
return template;
}

   function onClick(e) {
      e.preventDefault();

      const rows = document.querySelectorAll('tbody tr');

      const text = input.value.toLowerCase();
      
      for (let row of rows) {
         row.removeAttribute('class', 'select');
         const rowText = row.textContent.toLowerCase();
   
         if (rowText.includes(text) && text !== '') {
            row.setAttribute('class', 'select');
         }
      }

      input.value = '';
   }