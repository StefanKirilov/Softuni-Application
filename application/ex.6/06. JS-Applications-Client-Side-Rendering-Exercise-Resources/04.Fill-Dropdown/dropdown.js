import { render, html } from "../node_modules/lit-html/lit-html.js";

const menu = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit)

getData();

async function getData(){
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const data = await response.json();
    update(Object.values(data).map(d => createOption(d)));
}

function update(option) {
    render(option, menu)
}

function createOption(option){
    const template = html `<option value='${option._id}'>${option.text}</option>`;
    return template;
}

function onSubmit(e){
    e.preventDefault();

    const input = form.querySelector('#itemText');
    const text = input.value;
    addItem(text);

}

async function addItem(text) {
    if (text.length !== 0) {
        await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ text })
        });
    }
    form.reset();
    getData();
}

