async function lockedProfile() {
    let main = document.querySelector("#main");
    let baseUrl = `http://localhost:3030/jsonstore/advanced/profiles`;
    main.replaceChildren();

    try{
    let response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error('Error');
    }
    let data = await response.json();
    let id = 1;

    Object.values(data).forEach((value) => {
        let divProfile = document.createElement('div');
        divProfile.classList.add("profile");

        let imgUserIcon = document.createElement('img');
        imgUserIcon.classList.add("userIcon");
        imgUserIcon.setAttribute('src', './iconProfile2.png');

        let labelLock = document.createElement('label');
        labelLock.textContent = 'Lock';
        let inputLock = document.createElement('input');
        inputLock.setAttribute('type', 'radio');
        inputLock.setAttribute('name', `user${id}Locked`);
        inputLock.setAttribute('value', 'lock');
        inputLock.setAttribute('checked', 'checked');

        let labelUnlock = document.createElement('label');
        labelUnlock.textContent = 'Unlock';
        let inputUnlock = document.createElement('input');
        inputUnlock.setAttribute('type', 'radio');
        inputUnlock.setAttribute('name', `user${id}Locked`);
        inputUnlock.setAttribute('value', 'unlock');

        let br = document.createElement('br');
        let hr1 = document.createElement('hr');

        let labelUserName = document.createElement('label');
        labelUserName.textContent = 'Username';
        let inputUserName = document.createElement('input');
        inputUserName.setAttribute('type', 'text');
        inputUserName.setAttribute('name', `user${id}Username`);
        inputUserName.setAttribute('value', `${value.username}`);
        inputUserName.disabled = true;
        inputUserName.readonly = true;

        let usernameDiv = document.createElement('div');
        usernameDiv.classList.add(`user1Username`);
        usernameDiv.style.display = 'none';

        let hr2 = document.createElement('hr');

        let labelEmail = document.createElement('label');
        labelEmail.textContent = 'Email:';
        let inputEmail = document.createElement('input');
        inputEmail.setAttribute('type', 'email');
        inputEmail.setAttribute('name', `user${id}Email`);
        inputEmail.setAttribute('value', `${value.email}`);
        inputEmail.disabled = true;
        inputEmail.readonly = true;

        let labelAge = document.createElement('label');
        labelAge.textContent = 'Age:';
        let inputAge = document.createElement('input');
        inputAge.setAttribute('type', 'email');
        inputAge.setAttribute('name', `user${id}Age`);
        inputAge.setAttribute('value', `${value.age}`);
        inputAge.disabled = true;
        inputAge.readonly = true;

        id++;

        let btnShow = document.createElement('button');
        btnShow.textContent = 'Show more';
        btnShow.addEventListener('click', (e) => {
            if (inputUnlock.checked && e.target.textContent === 'Show more') {
                usernameDiv.style.display = 'block';
                btnShow.textContent = 'Hide it';
            } else if (inputUnlock.checked && e.target.textContent === 'Hide it') {
                usernameDiv.style.display = 'none';
                btnShow.textContent = 'Show more';
            }
        })

        usernameDiv.appendChild(hr2);
        usernameDiv.appendChild(labelEmail);
        usernameDiv.appendChild(inputEmail);
        usernameDiv.appendChild(labelAge);
        usernameDiv.appendChild(inputAge);

        divProfile.appendChild(imgUserIcon);
        divProfile.appendChild(labelLock);
        divProfile.appendChild(inputLock);
        divProfile.appendChild(labelUnlock);
        divProfile.appendChild(inputUnlock);
        divProfile.appendChild(br);
        divProfile.appendChild(hr1);
        divProfile.appendChild(labelUserName);
        divProfile.appendChild(inputUserName);
        divProfile.appendChild(usernameDiv);
        divProfile.appendChild(btnShow);

        main.appendChild(divProfile);

    })
}
catch(error){
    console.log(error.message);
}

}