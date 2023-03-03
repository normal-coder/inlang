import type { Uri } from "vscode";
import { relative } from "path";

/**
 * Determines the closest path from the `options` compared to the `to` path.
 *
 * The patch is only searched for "upwards".
 *
 * @example
 *     const result = determineClosestPath({
            options: [
            'some/path/packages/module-a/config.json',
            'some/path/packages/module-a/src/utils/config.json',
            'some/path/packages/config.json',
            ],
            to: 'some/path/packages/index.js',
        });
        >> 'some/path/packages/config.json'
 */
export function determineClosestUri(origin: Uri, locations: Uri[]) {
  const closestLocation = locations.reduce<{ uri?: Uri, distance: number }>((accumulator, location) => {
    const distance = relative(origin.path, location.path).length;
    return distance < accumulator.distance ? { uri: location, distance } : accumulator;
  }, { uri: undefined, distance: Number.MAX_SAFE_INTEGER });
  return closestLocation.uri;
}
