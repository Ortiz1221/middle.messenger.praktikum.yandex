import { API } from "../api/api";
import { HTTPTransport } from "../httpTransport/httpTransport";
import { Route } from "./Route";

interface IBlock<T> {
    new(...args: unknown[]): T;
    addListeners(): void;
    getContent(): Element;
    hide(): void;
}

export class Router<T> {
    routes: Route<T>[]

    _rootQuery: string

    history: History

    _currentRoute: null | Route<T>

    http: HTTPTransport;

    isLogged: boolean;

    constructor(rootQuery: string) {
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this.http = new HTTPTransport();
        this.isLogged = false;
    }

    use(pathname: string, block: any) {
        const route: Route<T> = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((event: Event) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        });

        const pathName = window.location.pathname;

        this.http.get(API.getUser)
            .then((res: XMLHttpRequest) => {
                if (res.status === 200) {
                    this.isLogged = true;
                    pathName === "/"
                    || pathName === "/sign-up"
                        ? this.go("/messenger")
                        : this._onRoute(pathName);
                } else if (res.status !== 200) {
                    this.go("/");
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    _onRoute(pathname: string) {
        const route: any = this.getRoute(pathname);
        if (!route) {
            this.go("/not-found");
        } else {
            if (this._currentRoute && this._currentRoute !== route) {
                this._currentRoute.leave();
            }
            this._currentRoute = route;
            route.render(route, pathname);
        }
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route._pathname.match(pathname));
    }
}
