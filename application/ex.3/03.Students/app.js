const tBody = document.querySelector('tbody');

const form = document.querySelector('#form');
const firstNameInput = document.querySelector('[name=firstName]');
const lastNameInput = document.querySelector('[name=lastName]');
const facultyNumberInput = document.querySelector('[name=facultyNumber]');
const gradeInput = document.querySelector('[name=grade]');

const url = `http://localhost:3030/jsonstore/collections/students`;

form.addEventListener('submit', onSubmit);

async function onSubmit(e){
    e.preventDefault();

    const formData = new FormData(form);
    const { firstName, lastName, facultyNumber, grade } = Object.fromEntries(formData.entries());


    if (firstName != '' && lastName != '' && facultyNumber != '' && grade != '') {
        try {

            const dataPost = {
                firstName: firstName,
                lastName: lastName,
                facultyNumber: facultyNumber,
                grade: grade
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataPost)
            });
            if (!response.ok) throw new Error('Error');

            onLoad();

            e.target.reset();

        } catch (err) {
            console.log(err.message);
        }
    }
}

async function onLoad() {

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error');

        const data = await response.json();

        tBody.innerHTML = '';

        for (let line of Object.values(data)) {

            const { firstName, lastName, facultyNumber, grade } = line;

            const tr = document.createElement('tr');
            const tdFirstName = document.createElement('td');
            tdFirstName.textContent = firstName;

            const tdLastName = document.createElement('td');
            tdLastName.textContent = lastName;

            const tdFacultyNumber = document.createElement('td');
            tdFacultyNumber.textContent = facultyNumber;

            const tdGrade = document.createElement('td');
            tdGrade.textContent = grade;

            tr.appendChild(tdFirstName);
            tr.appendChild(tdLastName);
            tr.appendChild(tdFacultyNumber);
            tr.appendChild(tdGrade);

            tBody.appendChild(tr);

        }

    } catch (err) {
        console.log(err.message);
    }
}

onLoad();


