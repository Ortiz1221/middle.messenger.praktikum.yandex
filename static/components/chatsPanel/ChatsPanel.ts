import { API } from "../../modules/api/api.js";
import { Block } from "../../modules/block/Block.js";
import { Popup } from "../popup/popup.js";
import { Chat } from "../chat/Chat.js"
import { chatsPanelTmpl } from "./ChatsPanel.tmpl.js";

export class ChatsPanel extends Block {
    data: {};
    addChatPopup: Popup
    chatScreen: Chat

    constructor(props?: {}) {
        super("div", "sidebar", {
            tmpl: chatsPanelTmpl,
            chatsAreAdded: false,
            currChat: null,
            addChatPopupData: {
                name: "popup__add-chat",
                action: "addChat",
                title: "Create new chat",
                formName: "add-chat",
                inputs: [
                    {
                        name: "title",
                        placeholder: "Chat title",
                        errorMsg: "Can't be empty"
                    }
                ],
                btnText: "Add chat",
            },
            events: {
                click: (e: Event) => {
                    this.togglePopup(e, "sidebar__add-chat-btn", this.addChatPopup);
                    this.logout(e);
                    this.selectChat(e);
                } 
            }
        }, "main", "afterbegin")
        
        this.chatScreen = new Chat();

        if(this.props) {
            this.addChatPopup = new Popup({
                data: this.props.addChatPopupData, 
                handleChatAdd: this.handleChatAdd
            });
        }
    }
    
    handleChatAdd = (formValues: {}) => {
        this.http.sendData(
            API.createChat, 
            "POST", 
            formValues
        )
        .then((res: XMLHttpRequest) => {
            if(res.status === 200) {
                this.getChats();
            }
        })
        .catch(err => console.log(err))
    }

    togglePopup(e: Event, targetClass: string, popup: Popup) {
        const target = e.target as HTMLElement;
        if(target.classList.contains(targetClass)) {
            popup._element?.classList.toggle("popup--is-opened")
        }
    }

    selectChat(e: Event) {
        const target = e.target as HTMLElement;
        const id = target.dataset.chatId;
        if(id) {
            const panel = target.closest(".sidebar__chat-item");
            
            if(panel) {
                if(panel.classList.contains("sidebar__chat-item--active")) {
                    return;
                }
                
                const titleEl = panel.querySelector(".chat__name");
                const title = titleEl ? titleEl.textContent : "";

                panel.classList.add("sidebar__chat-item--active");
                this.chatScreen.setChat(id, title);
                this.markChatPanel(panel);
            }
        }
    }

    markChatPanel(target: Element) {
        const panels = document.querySelectorAll(".sidebar__chat-item");
        const className = "sidebar__chat-item--active";

        panels.forEach(panel => {
            const classList = panel.classList;
            if(classList.contains(className)) {
                classList.remove(className)
            } 
        })

        target.classList.add(className);
    }

    getChats() {
        this.http.get(API.getChats)
        .then((res: XMLHttpRequest) => {
            if(res.status === 200 && res.readyState === 4) {
                try {
                    this.setProps({
                        chats: JSON.parse(res.response), 
                        chatsAreAdded: true
                    })
                } catch(err) {
                    console.error(err);
                }
            }
        })
        .catch(err => console.log(err));
    }

    getUser() {
        this.http.get(API.getUser)
        .then((res: XMLHttpRequest) => {
            if(res.status === 200 && res.readyState === 4) {
                try {
                    const user = JSON.parse(res.response);
                    user.avatar = `https://ya-praktikum.tech/api/v2/resources${user.avatar}`;
                    this.setProps({user})
                } catch(err) {
                    console.error(err);
                }
            }
        })
        .catch(err => console.log(err))
    }

    logout(e: Event) {
        const target = e.target as HTMLElement;
        if(target.dataset.action === "logout") {
            this.http.request(
                API.logOut, {
                    method: "POST",
                }
            )
        }
    }

    componentDidMount() {
        this.getChats();
        this.getUser();
    }

    
    render() {
        //@ts-ignore
        return Handlebars.compile(chatsPanelTmpl)(this.props);
    }
}