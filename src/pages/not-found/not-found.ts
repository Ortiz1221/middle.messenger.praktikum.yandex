import { notFound } from "./not-found.tmpl";
import { Block } from "../../modules/block/Block";

const Handlebars = require("handlebars");

export class NotFound extends Block {
    constructor() {
        super("main", "page error");
    }

    render() {
        return Handlebars.compile(notFound)();
    }
}
