/**
 * Plugin System for humanize-number v3.1.0
 * Allows users to register custom format plugins
 */

import { HumanizeOptions, UnitDefinition } from "../types";

// Extended plugin interface
export interface FormatPlugin {
  name: string; // Plugin identifier
  formatMethod: string; // Format method name (e.g., "seismic", "radiation")
  units: {
    metric: UnitDefinition[];
    imperial: UnitDefinition[];
  };
  defaultOptions?: Partial<HumanizeOptions>;
  formatter?: (
    value: number,
    unit: UnitDefinition,
    options: HumanizeOptions
  ) => string;
  parser?: (str: string) => number | null;
}

// Plugin registry to store all registered plugins
const pluginRegistry: Map<string, FormatPlugin> = new Map();

/**
 * Register a custom format plugin
 * @param plugin - The plugin configuration
 * @throws Error if plugin with same name already exists
 */
export function registerPlugin(plugin: FormatPlugin): void {
  if (!plugin.name || !plugin.formatMethod) {
    throw new Error("Plugin must have a name and formatMethod");
  }

  if (pluginRegistry.has(plugin.formatMethod)) {
    throw new Error(
      `Plugin with formatMethod "${plugin.formatMethod}" already exists`
    );
  }

  if (!plugin.units || !plugin.units.metric || !plugin.units.imperial) {
    throw new Error("Plugin must define units for both metric and imperial");
  }

  pluginRegistry.set(plugin.formatMethod, plugin);
}

/**
 * Unregister a plugin by format method
 * @param formatMethod - The format method to unregister
 * @returns true if plugin was removed, false if not found
 */
export function unregisterPlugin(formatMethod: string): boolean {
  return pluginRegistry.delete(formatMethod);
}

/**
 * Get a registered plugin by format method
 * @param formatMethod - The format method
 * @returns The plugin or undefined if not found
 */
export function getPlugin(formatMethod: string): FormatPlugin | undefined {
  return pluginRegistry.get(formatMethod);
}

/**
 * Check if a plugin is registered
 * @param formatMethod - The format method to check
 */
export function hasPlugin(formatMethod: string): boolean {
  return pluginRegistry.has(formatMethod);
}

/**
 * Get all registered plugins
 * @returns Array of all registered plugins
 */
export function getAllPlugins(): FormatPlugin[] {
  return Array.from(pluginRegistry.values());
}

/**
 * Get list of all registered format methods (including plugins)
 */
export function getRegisteredFormatMethods(): string[] {
  return Array.from(pluginRegistry.keys());
}

/**
 * Clear all registered plugins (useful for testing)
 */
export function clearPlugins(): void {
  pluginRegistry.clear();
}

/**
 * Format a value using a registered plugin
 * @param value - The numeric value to format
 * @param formatMethod - The plugin's format method
 * @param options - Formatting options
 * @returns Formatted string
 */
export function formatWithPlugin(
  value: number,
  formatMethod: string,
  options: HumanizeOptions = {}
): string {
  const plugin = getPlugin(formatMethod);
  if (!plugin) {
    throw new Error(`No plugin registered for format method "${formatMethod}"`);
  }

  const unitSystem = options.unitSystem || "metric";
  const units = plugin.units[unitSystem];

  if (!units || units.length === 0) {
    throw new Error(
      `No units defined for ${unitSystem} in plugin "${plugin.name}"`
    );
  }

  // Merge plugin default options with user options
  const mergedOptions: HumanizeOptions = {
    ...plugin.defaultOptions,
    ...options,
  };

  // Find appropriate unit based on value
  const absValue = Math.abs(value);
  let selectedUnit = units[units.length - 1]; // Default to smallest unit

  for (const unit of units) {
    if (absValue >= unit.value) {
      selectedUnit = unit;
      break;
    }
  }

  // Use custom formatter if provided
  if (plugin.formatter) {
    return plugin.formatter(value, selectedUnit, mergedOptions);
  }

  // Default formatting logic
  const convertedValue = value / selectedUnit.value;
  const precision =
    mergedOptions.precision !== undefined ? mergedOptions.precision : 2;
  const spacer = mergedOptions.spacer || " ";
  const separator = mergedOptions.separator || ".";
  const lowercase = mergedOptions.lowercase || false;

  const formattedNumber = convertedValue
    .toFixed(precision)
    .replace(".", separator);
  const symbol = lowercase
    ? selectedUnit.symbol.toLowerCase()
    : selectedUnit.symbol;

  return `${formattedNumber}${spacer}${symbol}`;
}

/**
 * Parse a string using a plugin's parser
 * @param str - The string to parse
 * @param formatMethod - The plugin's format method
 * @returns Parsed number or null if parsing fails
 */
export function parseWithPlugin(
  str: string,
  formatMethod: string
): number | null {
  const plugin = getPlugin(formatMethod);
  if (!plugin) {
    throw new Error(`No plugin registered for format method "${formatMethod}"`);
  }

  if (!plugin.parser) {
    throw new Error(`Plugin "${plugin.name}" does not provide a parser`);
  }

  return plugin.parser(str);
}
