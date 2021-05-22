import { Form } from "../../components/form/Form";
import { btn } from "../../components/btn/btn.tmpl";
import { Block } from "../../modules/block/Block";
import { signInTmpl } from "./sign-in.tmpl";
import { router } from "../../script";
import { API } from "../../modules/api/api";

const Handlebars = require("handlebars");

export class SignIn extends Block {
    form: Form;

    events?: {};

    constructor() {
        super("main", "page auth", {
            btn: {
                tmpl: Handlebars.registerPartial("btn", btn),
                text: "Enter",
            },
            tmpl: signInTmpl,
            events: {
                submit: (e: Event) => {
                    const isValid = this.form.onSubmit(e);
                    if (isValid) {
                        this.http.sendData(
                            API.signIn,
                            "POST",
                            this.form.values,
                        )
                            .then((res: XMLHttpRequest) => {
                                if (res.status === 200) {
                                    router.isLogged = true;
                                    router.go("/messenger");
                                } else {
                                    this.form.addErrMsg();
                                }
                            });
                    }
                    this.form.removeErrMsg();
                },
                focus: (e: Event) => {
                    this.form.onFocusOrBlur(e);
                    this.form.removeErrMsg();
                },
                blur: (e: Event) => {
                    this.form.onFocusOrBlur(e);
                    this.form.removeErrMsg();
                },
            },
        });

        if (this._element) {
            this.form = new Form(this._element.querySelector("form") as HTMLFormElement);
        }
    }

    render() {
        const { btn: button, tmpl } = this.props;
        if (button) {
            return Handlebars.compile(tmpl)({ text: button.text });
        }
    }
}
