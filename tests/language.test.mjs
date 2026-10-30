import test from "node:test";
import assert from "node:assert/strict";
import { languageDecision } from "../src/lib/language.js";

test("English is the default when no preference or browser language exists", () =>
  assert.equal(languageDecision(null, []), "english"));
test("French browser suggests French without automatic selection", () =>
  assert.equal(languageDecision(null, ["fr-FR", "en"]), "suggest-fr"));
test("Regional French languages are recognized", () =>
  assert.equal(languageDecision(null, ["fr-CA"]), "suggest-fr"));
test("Saved English wins over a French browser", () =>
  assert.equal(languageDecision("en", ["fr-FR"]), "english"));
test("Saved French wins over an English browser", () =>
  assert.equal(languageDecision("fr", ["en-US"]), "redirect-fr"));
test("Unrecognized saved preference falls back to browser suggestion", () =>
  assert.equal(languageDecision("unexpected", ["fr"]), "suggest-fr"));
test("Secondary French preference does not override primary English", () =>
  assert.equal(languageDecision(null, ["en-GB", "fr"]), "english"));
