import { Block } from "../../modules/block/Block";
import { normalizeDate } from "../../modules/normalizeDate/normalizeDate";
import { Socket } from "../../modules/socket/Socket";
import { NewChat } from "../../types/types";
import { ChatInfo } from "../chatInfo/ChatInfo";
import { Form } from "../form/Form";
import { msgTmpl } from "../msg/msg.tmpl";
import { chatTmpl } from "./chat.tmpl";

const Handlebars = require("handlebars");

export class Chat extends Block {
    data: {};

    chatId: number | null

    chatInfo: ChatInfo

    msgForm: Form

    socket: Socket

    constructor(props?: {}) {
        super("div", "main", {
            tmpl: chatTmpl,
            chatId: null,
            events: {
                submit: (e: Event) => {
                    this.msgForm.onSubmit(e, this.handleSendMsg);
                },
                click: (e: Event) => {
                    this.toggleChatInfo(e);
                    this.toggleAddUserPanel(e);
                },
            },
        }, ".sidebar", "afterend");

        this.chatInfo = new ChatInfo();
    }

    handleSendMsg = (text: string) => {
        const currDate = new Date();

        const { socket } = this.props;
        if (socket) {
            socket.send(text);
            const chatEl = document.querySelector(".main__chat-screen");

            if (chatEl) {
                const msgMarkup = Handlebars
                    .compile(msgTmpl)(
                        {
                            text,
                            time: normalizeDate(currDate),
                            userName: this.props.userName,
                        },
                    );
                chatEl.insertAdjacentHTML("beforeend", msgMarkup);
                chatEl.scrollTop = chatEl.scrollHeight;
            }
        }
    }

    toggleChatInfo(e: Event) {
        const target = e.target as HTMLElement;
        const targetClasses = target.classList;
        const chatPanel = document.querySelector(".main__chat-panel");
        if (targetClasses.contains("main__menu")) {
            targetClasses.toggle("main__menu--active");
            targetClasses.toggle("main__menu--not-active");
            if (chatPanel) {
                chatPanel.classList.toggle("main__chat-panel--hidden");
            }
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

    createForm(className: string) {
        const formEl = document.querySelector(`.${className}`);
        return new Form(formEl as HTMLFormElement);
    }

    setChat = (
        data: NewChat,
    ) => {
        this.setProps(
            data,
        );

        this.chatInfo.getChatInfo(data.chatId);
        this.msgForm = this.createForm("main__msg-form");
    }

    render() {
        return Handlebars.compile(chatTmpl)(this.props);
    }
}
