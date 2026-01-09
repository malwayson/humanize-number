/**
 * Example Plugins for humanize-number v3.1.0
 * These serve as templates for community plugin development
 */

import { FormatPlugin } from "./index";

/**
 * Seismic/Earthquake magnitude plugin
 * Formats earthquake magnitudes on the Richter scale
 */
export const seismicPlugin: FormatPlugin = {
  name: "seismic",
  formatMethod: "seismic",
  units: {
    metric: [{ value: 1, symbol: "M", name: "magnitude" }],
    imperial: [{ value: 1, symbol: "M", name: "magnitude" }],
  },
  defaultOptions: {
    precision: 1,
    spacer: " ",
  },
  formatter: (value, unit, options) => {
    const formatted = value.toFixed(options.precision || 1);
    return `${formatted}${options.spacer || " "}${unit.symbol}`;
  },
  parser: (str: string) => {
    const match = str.match(/^([\d.]+)\s*M$/i);
    return match ? parseFloat(match[1]) : null;
  },
};

/**
 * Radiation dose plugin
 * Formats radiation in Sieverts (Sv)
 */
export const radiationPlugin: FormatPlugin = {
  name: "radiation",
  formatMethod: "radiation",
  units: {
    metric: [
      { value: 1, symbol: "Sv", name: "sieverts" },
      { value: 0.001, symbol: "mSv", name: "millisieverts" },
      { value: 0.000001, symbol: "μSv", name: "microsieverts" },
    ],
    imperial: [
      { value: 0.01, symbol: "rem", name: "roentgen equivalent man" },
      { value: 0.00001, symbol: "mrem", name: "millirems" },
    ],
  },
  defaultOptions: {
    precision: 2,
    unitSystem: "metric",
  },
};

/**
 * Altitude/Elevation plugin
 * Formats altitude with special handling for aviation
 */
export const altitudePlugin: FormatPlugin = {
  name: "altitude",
  formatMethod: "altitude",
  units: {
    metric: [
      { value: 1000, symbol: "km", name: "kilometers" },
      { value: 1, symbol: "m", name: "meters" },
    ],
    imperial: [
      { value: 304.8, symbol: "ft", name: "feet" },
      { value: 0.3048, symbol: "in", name: "inches" },
    ],
  },
  defaultOptions: {
    precision: 0,
    unitSystem: "imperial", // Aviation typically uses feet
  },
  formatter: (value, unit, options) => {
    const converted = value / unit.value;
    const rounded = Math.round(converted);
    return `${rounded}${options.spacer || " "}${unit.symbol}`;
  },
};

/**
 * Decibel plugin
 * Formats sound levels in decibels
 */
export const decibelPlugin: FormatPlugin = {
  name: "decibel",
  formatMethod: "decibel",
  units: {
    metric: [{ value: 1, symbol: "dB", name: "decibels" }],
    imperial: [{ value: 1, symbol: "dB", name: "decibels" }],
  },
  defaultOptions: {
    precision: 1,
    spacer: " ",
  },
  formatter: (value, unit, options) => {
    const formatted = value.toFixed(options.precision || 1);
    return `${formatted}${options.spacer || " "}${unit.symbol}`;
  },
  parser: (str: string) => {
    const match = str.match(/^([\d.]+)\s*dB$/i);
    return match ? parseFloat(match[1]) : null;
  },
};

/**
 * pH Level plugin
 * Formats pH levels (0-14 scale)
 */
export const phPlugin: FormatPlugin = {
  name: "ph",
  formatMethod: "ph",
  units: {
    metric: [{ value: 1, symbol: "pH", name: "pH" }],
    imperial: [{ value: 1, symbol: "pH", name: "pH" }],
  },
  defaultOptions: {
    precision: 1,
    spacer: " ",
  },
  formatter: (value, unit, options) => {
    // Clamp to 0-14 range
    const clamped = Math.max(0, Math.min(14, value));
    const formatted = clamped.toFixed(options.precision || 1);
    return `${formatted}${options.spacer || " "}${unit.symbol}`;
  },
  parser: (str: string) => {
    const match = str.match(/^([\d.]+)\s*pH$/i);
    return match ? parseFloat(match[1]) : null;
  },
};

/**
 * Luminosity plugin
 * Formats light levels in lumens
 */
export const luminosityPlugin: FormatPlugin = {
  name: "luminosity",
  formatMethod: "luminosity",
  units: {
    metric: [
      { value: 1000000, symbol: "Mlm", name: "megalumens" },
      { value: 1000, symbol: "klm", name: "kilolumens" },
      { value: 1, symbol: "lm", name: "lumens" },
    ],
    imperial: [
      { value: 1000, symbol: "klm", name: "kilolumens" },
      { value: 1, symbol: "lm", name: "lumens" },
    ],
  },
  defaultOptions: {
    precision: 0,
  },
  formatter: (value, unit, options) => {
    const converted = value / unit.value;
    const precision = options.precision !== undefined ? options.precision : 0;
    const formatted = converted.toFixed(precision);
    return `${formatted}${options.spacer || " "}${unit.symbol}`;
  },
};

/**
 * Export all example plugins
 */
export const examplePlugins = {
  seismic: seismicPlugin,
  radiation: radiationPlugin,
  altitude: altitudePlugin,
  decibel: decibelPlugin,
  ph: phPlugin,
  luminosity: luminosityPlugin,
};
