import { assert } from "chai";
import { NotFound } from "../pages/not-found/not-found";
import { Route } from "../modules/router/Route";

describe("Route", function() {
    it("Must be created correctly", function() {
        const route = new Route("/not-found", NotFound, {rootQuery: ".app"});
        assert.exists(route);
        assert.equal(route._pathname, "/not-found", "The path is correct");
        assert.equal(route._blockClass, NotFound, "Block class is correct");
        assert.equal(route._props.rootQuery, ".app", "Props are correct");
        assert.isNull(route._block, "The block is null");
    });

    it("Can find a matching route", function() {
      const route = new Route("/not-found", NotFound, {rootQuery: ".app"});
      assert.isTrue(route.match("/not-found"), true, "The route match");
      assert.isNotTrue(route.match("/foo"), "Wrong route");
    })
});