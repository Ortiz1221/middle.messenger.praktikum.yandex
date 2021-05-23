import { API } from "../../modules/api/api";
import { Block } from "../../modules/block/Block";
import { Form } from "../form/Form";
import { Popup } from "../popup/popup";
import { chatInfoTmpl } from "./chatInfo.tmpl";

const Handlebars = require("handlebars");

type dataType = {
    users: number[],
    chatId: number
}

export class ChatInfo extends Block {
    data: {};

    currChat: string | null

    searchUserForm: Form;

    addUserForm: Form

    deleteUserForm: Form

    searchUserPopup: Popup

    constructor(props?: {}) {
        super("div", "main__chat-panel main__chat-panel--hidden", {
            tmpl: chatInfoTmpl,
            currChat: null,
            searchUserPopup: {
                name: "popup__search-user",
                action: "searchUser",
                title: "Find a user",
                formName: "search-user",
                inputs: [
                    {
                        name: "login",
                        placeholder: "Login",
                        errorMsg: "Invalid login",
                    },
                ],
                btnText: "Search",
            },
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const { name } = target;

                    if (name === "add-user") {
                        const isValidAdd = this.addUserForm.onSubmit(e);
                        if (isValidAdd) {
                            this.addUser(this.addUserForm.values);
                            this.clearSearch();
                        }
                    }

                    if (name === "delete-user") {
                        const isValidDelete = this.deleteUserForm.onSubmit(e);
                        if (isValidDelete) {
                            this.deleteUser(this.deleteUserForm.values);
                        }
                    }
                },
                click: (e: Event) => {
                    this.toggleAddUserPanel(e);
                    this.togglePopup(e);
                },
            },
        }, ".main", "afterend");

        this.searchUserPopup = new Popup({
            data: this.props.searchUserPopup,
            handleUserSearch: this.handleUserSearch,
        });
    }

    getChatInfo = (id: string) => {
        this.http.get(API.getChatUsers(id))
            .then((res: XMLHttpRequest) => {
                if (res.status === 200 && res.readyState === 4) {
                    try {
                        this.setProps({
                            users: JSON.parse(res.response), currChat: id,
                        });
                    } catch (err) {
                        throw new Error(err);
                    }
                    this.deleteUserForm = new Form(
                        document.querySelector(".main__chat-users-list") as HTMLFormElement,
                    );
                    this.clearSearch();
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    addUser(values: {[k: string]: string}) {
        if (this.props && this.props.currChat) {
            const currUsers = this.props.users;
            const { currChat } = this.props;
            const data: dataType = {
                users: [],
                chatId: +currChat,
            };
            let hasUser = false;

            Object.values(values).forEach((userId) => {
                if (currUsers) {
                    currUsers.forEach((user) => {
                        if (Object.values(user).includes(+userId)) {
                            hasUser = true;
                        }
                    });

                    !hasUser
                        ? data.users.push(+userId)
                        : hasUser = false;
                }
            });

            this.http.sendData(
                API.addUsers,
                "PUT",
                data,
            )
                .then((res: XMLHttpRequest) => {
                    if (res.status === 200 && res.readyState === 4) {
                        this.getChatInfo(currChat);
                    }
                });
        }
    }

    deleteUser(values: {[k: string]: string}) {
        if (this.props.currChat) {
            const { currChat } = this.props;
            const data: dataType = {
                users: [],
                chatId: +currChat,
            };

            Object.values(values).forEach((userId) => data.users.push(+userId));

            this.http.request(API.deleteUsers, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Set-Cookie": "HttpOnly",
                },
                method: "DELETE",
                data: JSON.stringify(data),
            })
                .then((res: XMLHttpRequest) => {
                    if (res.status === 200 && res.readyState === 4) {
                        this.getChatInfo(currChat);
                    }
                });
        }
    }

    clearSearch() {
        const res = document.querySelector(".main__add-user");
        if (res) {
            res.innerHTML = "";
        }
    }

    togglePopup(e: Event) {
        const target = e.target as HTMLElement;
        const popup = document.querySelector(".popup__search-user");
        const openPopupBtn = target.classList.contains("btn__search-user-popup");

        if (openPopupBtn && popup) {
            this.clearSearch();
            popup.classList.toggle("popup--is-opened");
        }
    }

    toggleAddUserPanel(e: Event) {
        const target = e.target as HTMLElement;
        const { dataset } = target;
        const addUserPanel = document.querySelector(".main__add-user-panel");
        const className = "main__add-user-panel--hidden";

        if (dataset.action === "show-add-panel") {
            if (addUserPanel) {
                const { classList } = addUserPanel;
                classList.toggle(className);
            }
        }
    }

    handleUserSearch = (formValues: {}) => {
        this.http.sendData(
            API.findUser,
            "POST",
            formValues,
        )
            .then((res: XMLHttpRequest) => {
                if (res.status === 200) {
                    try {
                        this.setProps({
                            searchRes: JSON.parse(res.response),
                        });
                    } catch (err) {
                        throw new Error(err);
                    }
                    this.addUserForm = new Form(document.querySelector(".main__add-user") as HTMLFormElement);
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    render() {
        return Handlebars.compile(chatInfoTmpl)(this.props);
    }
}
