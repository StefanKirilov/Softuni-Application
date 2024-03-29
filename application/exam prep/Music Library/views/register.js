import { register } from '../data/auth.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';

// TODO Replace with actual view
const registerTemplate = (onRegister) => html`
<section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit=${onRegister} class="login-form">
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="#">Login</a></p>
  </form>
</div>
</section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))

    //TODO change user object based on requirements
    async function onRegister({email, password, ['re-password']:repass}, form){

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