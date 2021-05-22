import { API } from "../../modules/api/api.js";
import { Block } from "../../modules/block/Block.js";
import { btn } from "../btn/btn.tmpl.js";
import { Form } from "../form/Form.js";
import { popupTmpl } from "./popup.tmpl.js";

interface IProps {
    data?: {
        name: string,
    },
    handleChatAdd?: Function,
    handleUserSearch?: Function,
    handleAvatarUpload?: Function
}

export class Popup extends Block {
    form: Form;
    events?: {};
    handleChatAdd: Function;
    handleUserSearch: Function;
    handleAvatarUpload: Function;

    constructor(props: IProps) {
        super("div", `popup ${props.data?.name}`, {
            data: props.data,
            tmpl: popupTmpl,
            events: {
                click: (e: Event) => {
                    const target = e.target as HTMLElement;
                    if(target && target.classList.contains("popup__close")) {
                        this.close();
                    }
                },
                submit: (e: Event) => {
                    const isValid = this.form.onSubmit(e);
                    if(isValid) {
                        this.submitForm(
                            e, 
                            "popup__add-chat", 
                            this.handleChatAdd,
                        );
                        this.submitForm(
                            e, 
                            "popup__search-user", 
                            this.handleUserSearch
                        );
                        this.submitForm(
                            e, 
                            "popup__change-avatar", 
                            this.handleAvatarUpload
                        );
                        this.close()
                    }
                },
                focus: (e: Event) => {
                    this.form.onFocusOrBlur(e);
                },
                blur: (e: Event) => {
                    this.form.onFocusOrBlur(e);
                }
            }
        }, "body");

        if(this._element) {
            this.form = new Form(this._element.querySelector("form") as HTMLFormElement);
        }

        const {
            handleChatAdd, 
            handleUserSearch, 
            handleAvatarUpload
        } = props;

        if(handleChatAdd) {
            this.handleChatAdd = handleChatAdd;
        }

        if(handleUserSearch) {
            this.handleUserSearch = handleUserSearch;
        }

        if(handleAvatarUpload) {
            this.handleAvatarUpload = handleAvatarUpload
        }
    }

    submitForm(e: Event, className: string, action: Function,) {
        const currTarget = e.currentTarget as HTMLElement;
        if(currTarget) {
            const currTargetClasses = currTarget.classList;
            if(currTargetClasses.contains(className)) {
                action(this.form.values);
            }
        }
    }

    close() {
        this._element?.classList.remove("popup--is-opened");
    }
    
    render() {
        if(this.props) {
            //@ts-ignore
            Handlebars.registerPartial("btn", btn);
            //@ts-ignore
            return Handlebars.compile(popupTmpl)(this.props.data);
        }
    }
}