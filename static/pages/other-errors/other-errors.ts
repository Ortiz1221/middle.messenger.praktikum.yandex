import { otherErrors } from "./other-errors.tmpl.js";
import { Block } from "../../modules/block/Block.js";

export class OtherErrors extends Block {
    constructor() {
        super("main", "page error");
    }

    render() {
        // @ts-ignore
        return Handlebars.compile(otherErrors)();
    }
}