import { determineClosestUri } from "./determineClosestUri.js";
import { it, expect, describe } from "vitest";
import { Uri } from "vscode";

describe("determineClosestUri()", () => {
  it("should find closest path", () => {
    const origin = Uri.parse("some/path/packages/module-a/src/utils/foo/index.js");
    const locations = [
      Uri.parse("some/path/packages/module-a/config.json"),
      Uri.parse("some/path/packages/module-a/src/utils/config.json"),
      Uri.parse("some/path/packages/config.json"),
    ];
    const result = determineClosestUri(origin, locations);
    expect(result).toBe(Uri.parse("some/path/packages/module-a/src/utils/config.json"))
  });

  it("should find closest path", () => {
    const origin = Uri.parse("some/path/packages/index.js");
    const locations = [
      Uri.parse("some/path/packages/module-a/config.json"),
      Uri.parse("some/path/packages/module-a/src/utils/config.json"),
      Uri.parse("some/path/packages/config.json"),
    ];
    const result = determineClosestUri(origin, locations);
    expect(result).toBe(Uri.parse("some/path/packages/config.json"))
  });
});
