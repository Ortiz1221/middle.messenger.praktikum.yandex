import { assert } from "chai";
import { Block } from "../modules/block/Block";

describe("Block", function() {
  it("Is created correctly", function() {
      const block = new Block("div", "hello", {prop: "42"}, null, "beforeend");
      const {_meta, props, renderMethod } = block;
      assert.exists(block);
      assert.propertyVal(_meta, "tagName", "div");
      assert.propertyVal(_meta, "className", "hello");
      assert.propertyVal(props, "prop", "42");
      assert.equal(renderMethod, "beforeend");
  });

  it("Props set correctly", function() {
    const block = new Block("div", "hello", {prop: "42"}, null, "beforeend");
    block.setProps({prop: "foo"});
    block.setProps({prop: "bar"});
    assert.propertyVal(block.props, "prop", "bar");
    assert.notPropertyVal(block.props, "prop", "foo");
  });
});
