const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', userLogin);
document.getElementById('user').style.display = 'none';
let url = `http://localhost:3030/users/login`;

async function userLogin(e){
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password
            })
        });
        let data = await res.json();

        if(!res.ok){
            throw new Error(data.message)
        }

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }

        localStorage.setItem('userData', JSON.stringify(userData));

        window.location = ('./index.html')
        
    } catch (error) {
        loginForm.reset();
        alert(error.message)
    }

}