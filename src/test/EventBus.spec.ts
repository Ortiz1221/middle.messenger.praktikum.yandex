import { assert } from "chai";
import { EventBus } from "../modules/eventBus/EventBus";

describe("EventBus", function() {
  const eventBus = new EventBus();
  const { listeners } = eventBus;
  const callback = () => 42;

  it("Must be defined", function() {
      assert.exists(eventBus);
  }) 

  it("Events can be added", function() {
    const events = ["one", "two", "three"];

    events.forEach((event) => eventBus.on(event, callback))

    assert.hasAllKeys(listeners, ["one", "two", "three"]);
    assert.include(listeners["two"], callback);
  })

  it("Event can be removed", function() {
    eventBus.off("two", callback);

    assert.notInclude(listeners["two"], callback);
  })

  it("Event can be removed", function() {
    eventBus.off("two", callback);

    assert.notInclude(listeners["two"], callback);
  })
})