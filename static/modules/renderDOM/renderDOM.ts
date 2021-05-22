import { Popup } from "../../components/popup/popup";
import { ChangePsw } from "../../pages/change-psw/change-psw";
import { Messenger } from "../../pages/messenger/messenger";
import { NotFound } from "../../pages/not-found/not-fount";
import { OtherErrors } from "../../pages/other-errors/other-errors";
import { SignIn } from "../../pages/sign-in/sign-in";
import { SignUp } from "../../pages/sign-up/sign-up";
import { UserSettings } from "../../pages/user-settings/user-settings";

type block = NotFound | OtherErrors |  Messenger | SignIn | SignUp | UserSettings | ChangePsw | Popup;

export function render(query: string, block: block) {
    const root = document.querySelector(query);
    if(root) {
        root.prepend(block.getContent() as Node);
    }
    return root;
}