import { render as renderDOM } from '../renderDOM/renderDOM.js'
import { isEqual } from '../isEqual/isEqual.js'

interface IBlock<T> {
    new(...args: any[]): T;
    addListeners?(): void;
    getContent?(): Element;
    hide?(): void;
}

export class Route<T> {
    _pathname: string
    _blockClass: IBlock<T>
    _block: any
    _props: {
        rootQuery?: string
    }

    constructor(pathname: string, view: IBlock<T>, props: {}) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    addToDOM() {
        if(this._props.rootQuery) {
            renderDOM(this._props.rootQuery, this._block);
        }
    }

    render() {  
        if (!this._block) {
            this._block = new this._blockClass();
            this.addToDOM();
            return;
        }

        this.addToDOM();
    }
}
