import { API } from "../../modules/api/api";
import { Block } from "../../modules/block/Block";
import { Popup } from "../popup/popup";
import { Chat } from "../chat/Chat";
import { Socket } from "../../modules/socket/Socket";
import { chatsPanelTmpl } from "./chatsPanel.tmpl";
import { IMsg, NewChat } from "../../types/types";
import { normalizeDate } from "../../modules/normalizeDate/normalizeDate";

const Handlebars = require("handlebars");

interface IChat {
    avatar: string,
    id: number,
    title: string,
    "created_by": number,
    "unread_count": number,
    "last_message"?: IMsg | string
}

export class ChatsPanel extends Block {
    data: {};

    addChatPopup: Popup

    chatScreen: Chat

    sockets: {[key: string]: Socket}

    tokens: {[key: string]: string}

    constructor(props?: {}) {
        super("div", "sidebar", {
            tmpl: chatsPanelTmpl,
            chatsAreAdded: false,
            addChatPopupData: {
                name: "popup__add-chat",
                action: "addChat",
                title: "Create new chat",
                formName: "add-chat",
                inputs: [
                    {
                        name: "title",
                        placeholder: "Chat title",
                        errorMsg: "Can't be empty",
                    },
                ],
                btnText: "Add chat",
            },
            events: {
                click: (e: Event) => {
                    this.togglePopup(e, "sidebar__add-chat-btn", this.addChatPopup);
                    this.logout(e);
                    this.selectChat(e);
                },
            },
        }, "main", "afterbegin");

        this.chatScreen = new Chat();
        this.tokens = {};
        this.sockets = {};

        this.addChatPopup = new Popup({
            data: this.props.addChatPopupData,
            handleChatAdd: this.handleChatAdd,
        });
    }

    handleChatAdd = (formValues: {}) => {
        this.http.sendData(
            API.createChat,
            "POST",
            formValues,
        )
            .then((res: XMLHttpRequest) => {
                if (res.status === 200 && res.readyState === 4) {
                    this.getChats();
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    togglePopup(e: Event, targetClass: string, popup: Popup) {
        const target = e.target as HTMLElement;
        if (target.classList.contains(targetClass)) {
            popup._element?.classList.toggle("popup--is-opened");
        }
    }

    selectChat(e: Event) {
        const target = e.target as HTMLElement;
        const { chatId } = target.dataset;

        if (chatId) {
            const panel = target.closest(".sidebar__chat-item") as HTMLElement | null;

            if (panel) {
                if (panel.classList.contains("sidebar__chat-item--active")) {
                    return;
                }

                const titleEl = panel.querySelector(".chat__name");
                const title = titleEl ? titleEl.textContent : "";
                const msg = this.props.chats?.find((chat: IChat) => {
                    if (chat.id === +chatId) {
                        return chat.last_message;
                    }

                    return false;
                });

                const data: NewChat = {
                    chatId,
                    title,
                    socket: this.sockets[chatId],
                };

                if (msg) {
                    data.msg = msg;
                }

                if (this.props.user) {
                    const { user } = this.props;
                    const { first_name: firstName, second_name: lastName } = user;
                    const userId = user.id;

                    data.userName = `${firstName} ${lastName}`;
                    data.userId = userId;
                }

                panel.classList.add("sidebar__chat-item--active");
                this.chatScreen.setChat(data);
                this.markChatPanel(panel);
            }
        }
    }

    markChatPanel(target: Element) {
        const panels = document.querySelectorAll(".sidebar__chat-item");
        const className = "sidebar__chat-item--active";

        panels.forEach((panel) => {
            const { classList } = panel;
            if (classList.contains(className)) {
                classList.remove(className);
            }
        });
        target.classList.add(className);
    }

    async getChats() {
        await this.http.get(API.getChats)
            .then((res: XMLHttpRequest) => {
                if (res.status === 200 && res.readyState === 4) {
                    try {
                        const chats = JSON.parse(res.response);

                        chats.forEach((chat: IChat) => {
                            const { last_message: lastMsg } = chat;

                            if (lastMsg && typeof lastMsg === "string") {
                                chat.last_message = JSON.parse(lastMsg);

                                if (typeof chat.last_message === "object") {
                                    const { time } = chat.last_message;
                                    chat.last_message.time = normalizeDate(time);
                                }
                            }
                        });

                        this.setProps({
                            chats,
                            chatsAreAdded: true,
                        });
                    } catch (err) {
                        throw new Error(err);
                    }
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    async getUser() {
        await this.http.get(API.getUser)
            .then((res: XMLHttpRequest) => {
                if (res.status === 200 && res.readyState === 4) {
                    try {
                        const user = JSON.parse(res.response);
                        let { avatar } = user;
                        if (avatar) {
                            avatar = API.getAvatar(avatar);
                        }
                        this.setProps({ user });
                    } catch (err) {
                        throw new Error(err);
                    }
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    logout(e: Event) {
        const target = e.target as HTMLElement;
        if (target.dataset.action === "logout") {
            this.http.request(
                API.logOut, {
                    method: "POST",
                },
            );
        }
    }

    openSockets(userId: string, chats: []) {
        chats.forEach((chat: { [key: string]: string | number; }) => {
            const chatId = chat.id.toString();
            this.http.sendData(
                API.getToken(chatId),
                "POST",
                { id: chatId },
            )
                .then((res: XMLHttpRequest) => {
                    if (res.status === 200 && res.readyState === 4) {
                        try {
                            const { token } = JSON.parse(res.response);
                            this.sockets[chatId] = new Socket(userId, chatId, token);
                        } catch (err) {
                            throw new Error(err);
                        }
                    }
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });
    }

    async componentDidMount() {
        await this.getUser();
        await this.getChats();

        const { chats, user } = this.props;
        if (chats && user) {
            const userId = user.id.toString();

            this.openSockets(userId, chats);
        }
    }

    render() {
        return Handlebars.compile(chatsPanelTmpl)(this.props);
    }
}
