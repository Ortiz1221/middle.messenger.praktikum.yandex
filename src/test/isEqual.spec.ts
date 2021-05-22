import { assert } from "chai";
import { isEqual } from "../modules/isEqual/isEqual";

describe("isEqual", function() {
  it("Correctly shallow comparing key-values of objects", function() {
      assert.isTrue(isEqual({}, {}));
      assert.isTrue(isEqual({a: 1}, {a: 1}));
      assert.isNotTrue(isEqual({a: 1}, {a: 2}));
      assert.isNotTrue(isEqual({a: 1}, {b: 1}));
      assert.isNotTrue(isEqual({a: 1}, {a: 1, b: 2}));
      assert.isNotTrue(isEqual({}, []));
  });

  it("Correctly shallow comparing arrays", function() {
    assert.isTrue(isEqual([], []));
    assert.isTrue(isEqual([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]));
    assert.isNotTrue(isEqual([], [1]));
    assert.isNotTrue(isEqual([1], []));
    assert.isNotTrue(isEqual([1, 2, 3, 4, 5], [1, 2, 3, 4, 6]));
    assert.isNotTrue(isEqual([1, 2, 3, 4, 5], [1, 2, 3, 4]));
  });

  it("Correctly comparing primitives", function() {
    assert.isTrue(isEqual("foo", "foo"));
    assert.isTrue(isEqual(42, 42));
    assert.isTrue(isEqual(true, true));
    assert.isNotTrue(isEqual("foo", "bar"));
    assert.isNotTrue(isEqual(42, 24));
    assert.isNotTrue(isEqual(undefined, "foo"));
    assert.isNotTrue(isEqual("foo", 42));
  });
});