import { assert } from "chai";
import { NotFound } from "../pages/not-found/not-found";
import { OtherErrors } from "../pages/other-errors/other-errors";
import { Router } from "../modules/router/Router";

describe("Router", function() {
    it("Must be defined", function() {
        const router = new Router(".app");
        assert.exists(router);
    });

    it("New Router has an empty arr of routes", function() {
        const router = new Router(".app");
        assert.isArray(router.routes, "Routes is array");
        assert.lengthOf(router.routes, 0, "No routes");
    });

    it("Can add a new route", function() {
        const router = new Router(".app");
        router.use("/not-found", NotFound);

        const routes = router.routes;
        assert.lengthOf(routes, 1, "Added a route");
        assert.equal(routes[0]._pathname, "/not-found", "Route path name is correct");
    });

    it("Can find a route if it is among used routes", function() {
        const router = new Router(".app");
        router
            .use("/not-found", NotFound)
            .use("/other-err", OtherErrors)
            .start();
        
        assert.equal(router.getRoute("/other-err")._pathname, "/other-err", "Got a correct route");
        assert.isUndefined(router.getRoute("/foo"), "Can't get an unexisting route");
    });
});