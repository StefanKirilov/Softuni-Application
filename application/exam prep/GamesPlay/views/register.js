import { register } from '../data/auth.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';

// TODO Replace with actual view
const registerTemplate = (onRegister) => html`
<section id="register-page" class="content auth">
<form @submit=${onRegister} id="register">
    <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password">

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">

        <input class="btn submit" type="submit" value="Register">

        <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
        </p>
    </div>
</form>
</section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))

    //TODO change user object based on requirements
    async function onRegister({email, password, ['confirm-password']: repass}, form){

        if(email == '' || password == '' || repass == ''){
            alert('Please fill in all fields');
            return;
        }
        if(password!= repass){
            alert('Passwords do not match');
            return;
        }
        await register(email, password);
        form.reset();

        //TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}