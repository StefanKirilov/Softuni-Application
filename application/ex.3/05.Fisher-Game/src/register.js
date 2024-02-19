const registerForm = document.querySelector('form');
registerForm.addEventListener('submit', onUserRegister);
document.getElementById('user').style.display = 'none';
let url = `http://localhost:3030/users/register`;
async function onUserRegister(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const {email, password, rePass} = Object.fromEntries(formData);

    try{

        if ([...formData.values()].some(el => el == '')){
            throw new Error('All fields are required!');
        }
        else if(password != rePass){
            throw new Error('Passwords don\'t match');
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
                rePass
            })
        });

        if(!res.ok){
            const error = await res.json();
            registerForm.reset();
            throw new Error(error.message)
        }
        const data = await res.json();
        const user = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }

        localStorage.setItem('userData', JSON.stringify(user));
        window.location = './index.html'
        
    }
    catch(error){
        alert(error.message);
    }

}
