import { notFound } from "./not-found.tmpl.js";
import { Block } from "../../modules/block/Block.js";


export class NotFound extends Block {
    constructor() {
        super("main", "page error");
    }

    render() {
        // @ts-ignore
        return Handlebars.compile(notFound)();
    }
}

