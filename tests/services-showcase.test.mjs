import assert from "node:assert/strict";
import test from "node:test";

import {
  getActiveServiceIndex,
  getServiceCardState,
} from "../src/lib/services-showcase.ts";

test("handles an empty showcase without selecting a card", () => {
  assert.equal(getActiveServiceIndex(0.8, 0), -1);
});

test("keeps the opening thumbnail before activating the first service", () => {
  assert.equal(getActiveServiceIndex(0, 4), -1);
  assert.equal(getActiveServiceIndex(0.049, 4), -1);
  assert.equal(getActiveServiceIndex(0.05, 4), 0);
});

test("advances four services at quarter-scroll boundaries", () => {
  assert.equal(getActiveServiceIndex(0.249, 4), 0);
  assert.equal(getActiveServiceIndex(0.25, 4), 1);
  assert.equal(getActiveServiceIndex(0.5, 4), 2);
  assert.equal(getActiveServiceIndex(0.75, 4), 3);
  assert.equal(getActiveServiceIndex(1, 4), 3);
});

test("assigns the reference animation roles around the active card", () => {
  assert.equal(getServiceCardState(0, -1), "intro");
  assert.equal(getServiceCardState(1, -1), "hidden");

  assert.equal(getServiceCardState(0, 0), "active");
  assert.equal(getServiceCardState(1, 0), "next");
  assert.equal(getServiceCardState(2, 0), "hidden");

  assert.equal(getServiceCardState(0, 2), "exited");
  assert.equal(getServiceCardState(1, 2), "previous");
  assert.equal(getServiceCardState(2, 2), "active");
  assert.equal(getServiceCardState(3, 2), "next");
});
