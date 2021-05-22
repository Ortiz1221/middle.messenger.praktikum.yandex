import { Block } from "../../modules/block/Block";
import { messengerTmpl } from "./messenger.tmpl";
import { ChatsPanel } from "../../components/chatsPanel/ChatsPanel";

const Handlebars = require("handlebars");

export class Messenger extends Block {
    chatsPanel: ChatsPanel

    constructor() {
        super("main", "page messenger");
        this.chatsPanel = new ChatsPanel();
    }

    render() {
        return Handlebars.compile(messengerTmpl)();
    }
}
