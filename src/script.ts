import "./vendor/normalize.css";
import "./scss/style.scss";

import "./assets/img/icons/settings.svg";
import "./assets/img/icons/log-out.svg";
import "./assets/img/userpic-placeholder.png";
import "./assets/img/icons/close.svg";
import "./assets/img/female-profile-pic.jpg";
import "./assets/img/girl_with_flower.svg";
import "./assets/img/magic_girls.svg";

import { Router } from "./modules/router/Router";
import { Messenger } from "./pages/messenger/messenger";
import { SignIn } from "./pages/sign-in/sign-in";
import { SignUp } from "./pages/sign-up/sign-up";
import { UserSettings } from "./pages/user-settings/user-settings";
import { ChangePsw } from "./pages/change-psw/change-psw";
import { NotFound } from "./pages/not-found/not-found";
import { OtherErrors } from "./pages/other-errors/other-errors";

export const router = new Router(".app");

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
    const isNav = target.classList.contains("nav-item");
    if (isNav) {
        const { path } = target.dataset;
        if (path) {
            if (path === "logout") {
                router.isLogged = false;
            }
            router.go(path);
        }
    }
});
