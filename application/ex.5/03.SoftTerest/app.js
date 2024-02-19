import { logout } from "./api/user.js";
import { router } from "./router.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from './views/home.js';
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

const links = {
    '/': showHome,
    '/login': showLogin,
    '/register': showRegister,
    '/create': showCreate,
    '/catalog': showCatalog,
    '/details': showDetails,
    '/logout': async function () {
        await logout();
        onLoad.goTo('/');
    },
}

const onLoad = router(links);
onLoad.goTo('/');


