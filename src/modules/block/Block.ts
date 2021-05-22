import { EventBus } from "../eventBus/EventBus";
import { cloneDeep } from "../cloneDeep/cloneDeep";
import { HTTPTransport } from "../httpTransport/httpTransport";
import { Socket } from "../socket/Socket";
import { IProps } from "../../types/types";

type renderMethodType = "beforebegin" | "afterbegin" | "beforeend" | "afterend";

interface IEvents {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
}

export class Block {
    _element: HTMLElement | null

    _meta: {
        tagName?: string | undefined;
        className?: string | undefined;
        props?: {};
    } | null;

    setProps: (nextProps: {}) => void;

    props: IProps;

    eventBus: () => EventBus;

    static EVENTS: IEvents;

    http: HTTPTransport;

    root: string

    renderMethod: renderMethodType

    constructor(
        tagName = "div",
        className = "",
        props = {},
        root = "body",
        renderMethod: renderMethodType = "beforeend",
    ) {
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            className,
            props,
        };
        this.eventBus = () => eventBus;
        this.http = new HTTPTransport();
        this._registerEvents(eventBus);
        this.props = this._makePropsProxy(props);
        this.root = root;
        this.renderMethod = renderMethod;
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        if (this._meta) {
            const { tagName, className } = this._meta;
            if (tagName && className) {
                this._element = this._createDocumentElement(tagName, className);
            }
        }
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() {

    }

    _componentDidUpdate(oldProps: {}, newProps: {}) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: {}, newProps: {}) {
        return true;
    }

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render() as unknown;
        const el = this._element as HTMLElement;
        const root = document.querySelector(this.root);
        if (el) {
            el.innerHTML = block as string;
        }

        if (root) {
            root.insertAdjacentElement(this.renderMethod, el);
        }

        this._addEvents();
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy = (props: {}) => {
        const eventBus = this.eventBus.bind(this);
        return new Proxy(props, {
            get(target: {[k: string]: unknown}, prop: string | number | symbol) {
                const value = target[prop as string | number];
                return typeof value === "function" ? value.bind(target) : value;
            },

            set(target, prop: string | number | symbol, value) {
                const oldProps = cloneDeep(target);
                target[prop as string | number] = value;
                eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },

            deleteProperty() {
                throw new Error("Nope");
            },
        });
    }

    _createDocumentElement(tagName: string, className: string) {
        const el = document.createElement(tagName);
        el.className = className;
        return el;
    }

    _addEvents() {
        if (this.props) {
            const { events = {} } = this.props;
            Object.keys(events).forEach((eventName) => {
                if (this._element) {
                    const isFocusOrBlur: boolean = eventName === "focus" || eventName === "blur";
                    this._element.addEventListener(eventName, events[eventName], isFocusOrBlur);
                }
            });
        }
    }

    hide() {
        const el = this.getContent() as HTMLElement;
        if (el) {
            el.remove();
        }
    }
}

Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
};
