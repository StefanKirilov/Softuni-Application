const tBody = document.querySelector('tbody');
tBody.innerHTML = '';

const btnLoad = document.querySelector('#loadBooks');

const form = document.querySelector('form');
const inputTitle = document.querySelector('[name=title]');
const inputAuthor = document.querySelector('[name=author]');
const formTitle = document.querySelector('form h3');
console.log(formTitle);
const btnSubmit = document.querySelector('form button');
console.log(btnSubmit);

const url = 'http://localhost:3030/jsonstore/collections/books/';



btnLoad.addEventListener('click', onLoad);
form.addEventListener('submit', onSubmit);

//DONE
async function onLoad(e) {

    e.preventDefault();
    try {

        const response = await fetch(url)
        if (!response.ok) throw new Error('Error');
        const data = await response.json();
        tBody.innerHTML = '';
        form.reset();
        for (let line of Object.entries(data)) {
            const id = line[0];
            const { author, title } = line[1];

            generator(title, author, id, tBody);
        }

    } catch (err) {
        console.log(err.message);
    }
}
//DONE
function generator(title, author, id, parentElement) {
    const tr = document.createElement('tr');

    const tdTitle = document.createElement('td');
    tdTitle.textContent = title;

    const tdAuthor = document.createElement('td');
    tdAuthor.textContent = author;

    const tdBtns = document.createElement('td');
    tdBtns.setAttribute('id', id);

    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.addEventListener('click', onEdit);

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.addEventListener('click', onDelete);

    //Apend
    tdBtns.appendChild(btnEdit);
    tdBtns.appendChild(btnDelete);

    tr.appendChild(tdTitle)
    tr.appendChild(tdAuthor)
    tr.appendChild(tdBtns)

    parentElement.appendChild(tr);

}

function onEdit(e) {
    e.preventDefault();
    const currentId = e.target.parentElement.id;
    const currentTitle = e.target.parentElement.parentElement.children[0].textContent;
    const currentAuthor = e.target.parentElement.parentElement.children[1].textContent;

    inputTitle.value = currentTitle;
    inputAuthor.value = currentAuthor;

    formTitle.textContent = 'Edit FORM';
    btnSubmit.textContent = 'Save';

    btnSubmit.addEventListener('click', onSave)

    async function onSave(e) {
        e.preventDefault();
        if (formTitle.textContent == 'Edit FORM') {
            const dataRes = {
                author: inputAuthor.value,
                title: inputTitle.value,
            }

            const response = await fetch(`${url}${currentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataRes)
            })

            formTitle.textContent = 'FORM';
            btnSubmit.textContent = 'Submit';
            form.reset();


        }
    }
}

//DONE
async function onDelete(e) {
    e.preventDefault();
    const currentId = e.target.parentElement.id;

    try {
        const response = await fetch(`${url}/${currentId}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Error');

    } catch (err) {
        console.log(err.message);
    }
}

//DONE
async function onSubmit(e) {

    e.preventDefault();

    const dataForm = new FormData(form);
    const { title, author } = Object.fromEntries(dataForm.entries());

    if (title != '' && author != '') {

        const postData = {
            title,
            author
        }

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);

            e.target.reset();
            
        } catch (err) {
            console.log(err.message);
        }
    }

}