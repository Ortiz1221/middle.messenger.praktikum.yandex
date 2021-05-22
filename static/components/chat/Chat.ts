import { mockChat } from "../../data/mockChat.js";
import { Block } from "../../modules/block/Block.js";
import { ChatInfo } from "../chatInfo/ChatInfo.js";
import { Form } from "../form/Form.js";
import { chatTmpl } from "./chat.tmpl.js";


export class Chat extends Block {
    data: {};
    currChat: number | null
    chatInfo: ChatInfo
    msgForm: Form

    constructor(props?: {}) {
        super("div", "main", {
            tmpl: chatTmpl,
            currChat: null,
            mockMsgs: mockChat,
            events: {
                submit: (e: Event) => {
                    this.msgForm.onSubmit(e);
                },
                click: (e: Event) => {
                    this.toggleChatInfo(e);
                    this.toggleAddUserPanel(e);
                } 
            }
        }, ".sidebar", "afterend")
        
        this.chatInfo = new ChatInfo();
    }

    toggleChatInfo(e: Event) {
        const target = e.target as HTMLElement;
        const targetClasses = target.classList;
        const chatPanel = document.querySelector(".main__chat-panel");
        if(targetClasses.contains("main__menu")) {
            targetClasses.toggle("main__menu--active");
            targetClasses.toggle("main__menu--not-active");
            if(chatPanel) {
                chatPanel.classList.toggle("main__chat-panel--hidden");
            }
        }
    }

    toggleAddUserPanel(e: Event) {
        const target = e.target as HTMLElement;
        const dataset = target.dataset;
        const addUserPanel = document.querySelector(".main__add-user-panel");
        const className = "main__add-user-panel--hidden"

        if(dataset.action === "show-add-panel") {
            if(addUserPanel) {
                const classList = addUserPanel.classList;
                classList.toggle(className);
            }
        }
    }

    createForm(className: string) {
        const formEl = document.querySelector(`.${className}`);
        return new Form(formEl as HTMLFormElement)
    }

    setChat = (id: string, title: string | null) => {
        this.setProps({currChat: id, title});
        this.chatInfo.getChatInfo(id);
        this.msgForm = this.createForm("main__msg-form");
    }

    render() {
        //@ts-ignore
        return Handlebars.compile(chatTmpl)(this.props);
    }
}
