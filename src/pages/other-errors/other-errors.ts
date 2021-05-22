import { otherErrors } from "./other-errors.tmpl";
import { Block } from "../../modules/block/Block";

const Handlebars = require("handlebars");

export class OtherErrors extends Block {
    constructor() {
        super("main", "page error");
    }

    render() {
        return Handlebars.compile(otherErrors)();
    }
}
