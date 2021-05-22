import { changePswTmpl } from "./change-psw.tmpl";
import { Form } from "../../components/form/Form";
import { btn } from "../../components/btn/btn.tmpl";
import { Block } from "../../modules/block/Block";
import { API } from "../../modules/api/api";

const Handlebars = require("handlebars");

export class ChangePsw extends Block {
    form: Form;

    events?: {}

    constructor() {
        super("main", "page settings", {
            btn: {
                tmpl: Handlebars.registerPartial("btn", btn),
                text: "Save Changes",
            },
            tmpl: changePswTmpl,
            events: {
                submit: (e: Event) => {
                    const form = new Form(e.target as HTMLFormElement);
                    const isValid = form.onSubmit(e);
                    if (isValid) {
                        this.http.sendData(
                            API.changePsw,
                            "PUT",
                            form.values,
                        )
                            .then((res: XMLHttpRequest) => {
                                if (res.status === 200 && res.readyState === 4) {
                                    throw new Error("Password changed");
                                }
                            })
                            .catch((err) => {
                                throw new Error(err);
                            });
                    }
                },
                focus: (e: Event) => {
                    this.form.onFocusOrBlur(e);
                },
                blur: (e: Event) => {
                    this.form.onFocusOrBlur(e);
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
