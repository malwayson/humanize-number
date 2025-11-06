import { TemperatureScale, UnitSystem } from "../types";

/**
 * Convert weight between unit systems
 */
export function convertWeight(
  value: number,
  fromSystem: UnitSystem,
  toSystem: UnitSystem
): number {
  if (fromSystem === toSystem) return value;

  // Convert to base unit (grams)
  let grams: number;
  if (fromSystem === "imperial") {
    grams = value * 453.592; // assuming input is in pounds
  } else {
    grams = value; // grams is base for metric
  }

  // Convert from grams to target system
  if (toSystem === "imperial") {
    return grams / 453.592; // convert to pounds
  } else {
    return grams; // return grams
  }
}

/**
 * Convert distance between unit systems
 */
export function convertDistance(
  value: number,
  fromSystem: UnitSystem,
  toSystem: UnitSystem
): number {
  if (fromSystem === toSystem) return value;

  // Convert to base unit (meters)
  let meters: number;
  if (fromSystem === "imperial") {
    meters = value * 0.3048; // assuming input is in feet
  } else {
    meters = value; // meters is base for metric
  }

  // Convert from meters to target system
  if (toSystem === "imperial") {
    return meters / 0.3048; // convert to feet
  } else {
    return meters; // return meters
  }
}

/**
 * Convert temperature between scales
 */
export function convertTemperature(
  value: number,
  from: TemperatureScale,
  to: TemperatureScale
): number {
  if (from === to) return value;

  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = (value - 32) * (5 / 9);
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
  }

  // Convert from Celsius to target scale
  switch (to) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return celsius * (9 / 5) + 32;
    case "kelvin":
      return celsius + 273.15;
  }
}

/**
 * Convert speed between unit systems
 */
export function convertSpeed(
  value: number,
  fromSystem: UnitSystem,
  toSystem: UnitSystem
): number {
  if (fromSystem === toSystem) return value;

  // Convert to base unit (m/s)
  let metersPerSecond: number;
  if (fromSystem === "imperial") {
    metersPerSecond = value * 0.44704; // assuming input is in mph
  } else {
    metersPerSecond = value / 3.6; // assuming input is in km/h
  }

  // Convert from m/s to target system
  if (toSystem === "imperial") {
    return metersPerSecond / 0.44704; // convert to mph
  } else {
    return metersPerSecond * 3.6; // convert to km/h
  }
}

/**
 * Convert volume between unit systems
 */
export function convertVolume(
  value: number,
  fromSystem: UnitSystem,
  toSystem: UnitSystem
): number {
  if (fromSystem === toSystem) return value;

  // Convert to base unit (liters)
  let liters: number;
  if (fromSystem === "imperial") {
    liters = value * 3.78541; // assuming input is in gallons
  } else {
    liters = value; // liters is base for metric
  }

  // Convert from liters to target system
  if (toSystem === "imperial") {
    return liters / 3.78541; // convert to gallons
  } else {
    return liters; // return liters
  }
}

/**
 * Convert any value between unit systems based on format method
 */
export function convertUnits(
  value: number,
  formatMethod: string,
  fromSystem: UnitSystem,
  toSystem: UnitSystem
): number {
  switch (formatMethod) {
    case "weight":
      return convertWeight(value, fromSystem, toSystem);
    case "distance":
      return convertDistance(value, fromSystem, toSystem);
    case "speed":
      return convertSpeed(value, fromSystem, toSystem);
    case "volume":
      return convertVolume(value, fromSystem, toSystem);
    default:
      return value; // No conversion needed
  }
}
