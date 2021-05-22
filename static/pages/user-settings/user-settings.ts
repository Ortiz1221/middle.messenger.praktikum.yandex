
import { userSettingsTmpl } from "./user-settings.tmpl.js";
import { Form } from "../../components/form/Form.js"
import { btn } from "../../components/btn/btn.tmpl.js";
import { Block } from "../../modules/block/Block.js";
import { API } from "../../modules/api/api.js";
import { Popup } from "../../components/popup/popup.js";

export class UserSettings extends Block {
    form: Form;
    events?: {};
    changeAvatarPopup: Popup

    constructor() {
        super("main", "page settings", {
            btnText: "Save Changes",
            tmpl: userSettingsTmpl,
            //@ts-ignore
            btnTmpl: Handlebars.registerPartial("btn", btn),
            changeAvatarPopupData: {
                name: "popup__change-avatar",
                action: "changeAvatar",
                title: "Upload new profile picture",
                formName: "change-avatar",
                inputs: [
                    {
                        name: "avatar",
                        type: "file"
                    }
                ],
                btnText: "Upload",
            },
            events: {
                submit: (e: Event) => {
                    const isValid = this.form.onSubmit(e);
                    if(isValid) {
                        this.sendSettings();
                    }
                },
                focus: (e: Event) => {
                    this.form.onFocusOrBlur(e);
                },
                blur: (e: Event) => {
                    this.form.onFocusOrBlur(e);
                },
                click: (e: Event) => {
                    this.togglePopup(
                        e, 
                        "settings__edit-img-btn", 
                        this.changeAvatarPopup
                    );
                }
            }
        }, "body", "afterbegin");

        if(this.props) {
            this.changeAvatarPopup = new Popup({
                data: this.props.changeAvatarPopupData,
                handleAvatarUpload: this.handleAvatarUpload
            });
        }
    }

    handleAvatarUpload = (data: {}) => {
        this.http.request(API.uploadAvatar, {
            method: "PUT",
            data
        })
        .then((res: XMLHttpRequest) => {
            if(res.status === 200) {
                this.getUser();
            }
        })
        .catch(err => console.log(err))
    }

    getUser() {
        this.http.get(API.getUser)
        .then((res: XMLHttpRequest) => {
            if(res.status === 200 && res.readyState === 4) {
                try {
                    const data = JSON.parse(res.response);
                    data.avatar = `https://ya-praktikum.tech/api/v2/resources${data.avatar}`;
                    this.setProps(data);
                } catch(err) {
                    console.error(err);
                }
                this.form = this.createForm();
            }
        })
    }

    togglePopup(e: Event, targetClass: string, popup: Popup) {
        const target = e.target as HTMLElement;
        if(target.classList.contains(targetClass)) {
            popup._element?.classList.toggle("popup--is-opened")
        }
    }

    createForm() {
        return new Form(document.querySelector("form") as HTMLFormElement);
    }

    sendSettings() {
        this.http.sendData(
                API.updProfile, 
                "PUT", 
                this.form.values
            )
            .then((res: XMLHttpRequest) => {
                if(res.status === 200 && res.readyState === 4) {
                    try {
                        this.setProps(JSON.parse(res.response))
                    } catch(err) {
                        console.error(err);
                    }
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        //@ts-ignore
        return Handlebars.compile(this.props.tmpl)(this.props);
    }
}