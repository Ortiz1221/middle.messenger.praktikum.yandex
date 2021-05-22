import { Form } from "../../components/form/Form.js"
import { btn } from "../../components/btn/btn.tmpl.js";
import { Block } from "../../modules/block/Block.js";
import { signInTmpl } from "./sign-in.tmpl.js";
import { router } from "../../script.js";
import { API } from "../../modules/api/api.js";

export class SignIn extends Block {
    form: Form;
    events?: {};
    constructor() {
        super("main", "page auth", {
            btn: {
                //@ts-ignore
                tmpl: Handlebars.registerPartial("btn", btn),
                text: "Enter"
            },
            tmpl: signInTmpl,
            events: {
                submit: (e: Event) => {
                    const isValid = this.form.onSubmit(e);
                    if(isValid) {
                        this.http.sendData(
                            API.signIn,
                            "POST",
                            this.form.values
                        )
                        .then((res: XMLHttpRequest) => {
                            if(res.status === 200) {
                                router.isLogged = true;
                                router.go("/messenger");
                            } else {
                                this.form.addErrMsg();
                            }
                        })
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
                }
            }
        });
        
        if(this._element) {
            this.form = new Form(this._element.querySelector("form") as HTMLFormElement);
        }
    }

    render() {
        if(this.props) {
            const { btn, tmpl } = this.props;
            //@ts-ignore
            return Handlebars.compile(tmpl)({ text: btn.text });
        }
    }
}



