import { Block } from "../../modules/block/Block.js";
import { messengerTmpl } from "./messenger.tmpl.js";
import { Form } from "../../components/form/Form.js";
import { API } from "../../modules/api/api.js";
import { ChatsPanel } from "../../components/chatsPanel/ChatsPanel.js";

export class Messenger extends Block {
    chatsPanel: ChatsPanel
    
    constructor() {
        super("main", "page messenger");
        this.chatsPanel = new ChatsPanel();
    }
    render() {
        //@ts-ignore
        return Handlebars.compile(messengerTmpl)();
    }
}
