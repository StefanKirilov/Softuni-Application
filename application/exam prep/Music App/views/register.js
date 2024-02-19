import { register } from '../data/auth.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';

// TODO Replace with actual view
const registerTemplate = (onRegister) => html`
<section id="registerPage">
            <form @submit=${onRegister}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))

    //TODO change user object based on requirements
    async function onRegister({email, password, ['conf-pass']: repass}, form){

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