let url = `http://localhost:3030/jsonstore/messenger`;
let btnSend = document.getElementById('submit');
let btnRefresh = document.getElementById('refresh');
let messages = document.querySelector('#messages');
let author = document.querySelector('input[name=author]');
let content = document.querySelector('input[name=content]');

function attachEvents() {
    btnRefresh.addEventListener('click', showMessages);
    btnSend.addEventListener('click', sendMessage);
}

async function showMessages(){

    let response = await fetch(url);
    if(!response.ok){
        throw new Error('Error');
    }
    let data = await response.json();
    let result = '';
    messages.value = Object.values(data)
        .map(x => `${x.author}: ${x.content}`).join('\n');
}

async function sendMessage(){

    if (!author.value && !content.value) {
        alert('All fields are required');
    }
    let body = {
        author: author.value,
        content: content.value, 
    }

    let option = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(body)
        }

        let response = await fetch(url,option);
        if(!response.ok){
            throw new Error('Error');
        }
        let data = await response.json();
        
        author.value = '';
        content.value = '';

}

attachEvents();