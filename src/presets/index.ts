import { HumanizeOptions } from "../types";

// Re-export individual presets for tree-shaking
export { approximate } from "./approximate";
export { compact } from "./compact";
export { detailed } from "./detailed";
export { financial } from "./financial";
export { imperial } from "./imperial";
export { metric } from "./metric";
export { minimal } from "./minimal";
export { scientific } from "./scientific";
export { verbose } from "./verbose";

// Import for presets object
import approximatePreset from "./approximate";
import compactPreset from "./compact";
import detailedPreset from "./detailed";
import financialPreset from "./financial";
import imperialPreset from "./imperial";
import metricPreset from "./metric";
import minimalPreset from "./minimal";
import scientificPreset from "./scientific";
import verbosePreset from "./verbose";

/**
 * Collection of all presets
 */
export const presets = {
  compact: compactPreset,
  verbose: verbosePreset,
  financial: financialPreset,
  scientific: scientificPreset,
  approximate: approximatePreset,
  metric: metricPreset,
  imperial: imperialPreset,
  minimal: minimalPreset,
  detailed: detailedPreset,
};

/**
 * Get preset by name
 */
export function getPreset(name: keyof typeof presets): HumanizeOptions {
  return presets[name];
}
