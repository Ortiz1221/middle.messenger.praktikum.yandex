import { Router } from "./modules/router/Router.js";
import { Messenger } from './pages/messenger/messenger.js';
import { SignIn } from "./pages/sign-in/sign-in.js";
import { SignUp } from "./pages/sign-up/sign-up.js";
import { UserSettings } from "./pages/user-settings/user-settings.js";
import { ChangePsw } from "./pages/change-psw/change-psw.js";
import { NotFound } from "./pages/not-found/not-fount.js";
import { OtherErrors } from "./pages/other-errors/other-errors.js";

export const router = new Router('.app');

router
    .use("/", SignIn)
    .use("/messenger", Messenger)
    .use("/sign-up", SignUp)
    .use("/settings", UserSettings)
    .use("/change-psw", ChangePsw)
    .use("/not-found", NotFound)
    .use("/error", OtherErrors)
    .start();


document.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    const isNav = target.classList.contains('nav-item');
    if(isNav) {
        const path = target.dataset.path
        if(path) {
            if(path === "logout") {
                router.isLogged = false;
            }
            router.go(path);
        }
    }
})

