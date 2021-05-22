import { render as renderDOM } from "../renderDOM/renderDOM";
import { isEqual } from "../isEqual/isEqual";

interface IBlock<T> {
    new(...args: unknown[]): T;
    addListeners?(): void;
    getContent(): Element;
    hide(): void;
}

export class Route<T> {
    _pathname: string

    _blockClass: any

    _block: any

    _props: {
        rootQuery?: string
    }

    constructor(pathname: string, view: any, props: {}) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    addToDOM(): void {
        if (this._props.rootQuery) {
            renderDOM(this._props.rootQuery, this._block);
        }
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
            this.addToDOM();
            return;
        }

        this.addToDOM();
    }
}
