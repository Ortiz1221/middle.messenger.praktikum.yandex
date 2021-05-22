import { changePswTmpl } from "./change-psw.tmpl.js";
import { Form } from "../../components/form/Form.js"
import { btn } from "../../components/btn/btn.tmpl.js";
import { Block } from "../../modules/block/Block.js"
import { API } from "../../modules/api/api.js";

export class ChangePsw extends Block {
    form: Form;
    events?: {}
    constructor() {
        super("main", "page settings", {
            btn: {
                //@ts-ignore
                tmpl: Handlebars.registerPartial("btn", btn),
                text: "Save Changes"
            },
            tmpl: changePswTmpl,
            events: {
                submit: (e: Event) => {
                    const form = new Form(e.target as HTMLFormElement);
                    const isValid = form.onSubmit(e);
                    if(isValid) {
                        this.http.sendData(
                            API.changePsw, 
                            "PUT", 
                            form.values
                        )
                        .then((res: XMLHttpRequest) => {
                            if(res.status === 200 && res.readyState === 4) {
                                console.log("Password changed");
                            }
                        })
                        .catch(err => console.log(err));
                    }
                },
                focus: (e: Event) => {
                    this.form.onFocusOrBlur(e);
                },
                blur: (e: Event) => {
                    this.form.onFocusOrBlur(e);
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