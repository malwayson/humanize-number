import { TemplateOptions, FormatMethod, HumanizeOptions } from "../types";
import { humanizeNumber } from "./index";

/**
 * Format a template string with multiple values
 *
 * Template syntax: {key:format} or {key}
 * Examples:
 *   - "File: {size:data}, Speed: {speed:speed}"
 *   - "Distance: {distance:distance}, Time: {time:duration}"
 *
 * @param template - Template string with placeholders
 * @param options - Template options including values and formats
 * @returns Formatted string
 */
export function formatTemplate(
  template: string,
  options: TemplateOptions
): string {
  const {
    values,
    formats,
    defaultFormat = "generic",
    defaultOptions = {},
  } = options;

  // Regular expression to match {key:format} or {key}
  const regex = /\{(\w+)(?::(\w+(?:-\w+)*))?\}/g;

  return template.replace(regex, (match, key, format) => {
    // Get the value
    const value = values[key];
    if (value === undefined) {
      return match; // Keep placeholder if value not found
    }

    // Determine format method
    let formatMethod: FormatMethod = defaultFormat;
    let formatOptions: HumanizeOptions = defaultOptions;

    if (format) {
      formatMethod = format as FormatMethod;
    } else if (formats[key]) {
      const formatConfig = formats[key];
      if (Array.isArray(formatConfig)) {
        formatMethod = formatConfig[0];
        formatOptions = { ...defaultOptions, ...(formatConfig[1] || {}) };
      } else {
        formatMethod = formatConfig;
      }
    }

    // Format the value
    return humanizeNumber(value, formatMethod, formatOptions);
  });
}

/**
 * Format multiple values as a list
 *
 * @param values - Array of values to format
 * @param formatMethod - Format method to use
 * @param options - Humanize options
 * @param separator - Separator between values (default: ', ')
 * @returns Formatted string
 */
export function formatList(
  values: number[],
  formatMethod: FormatMethod = "generic",
  options: HumanizeOptions = {},
  separator: string = ", "
): string {
  return values
    .map((value) => humanizeNumber(value, formatMethod, options))
    .join(separator);
}

/**
 * Format key-value pairs
 *
 * @param data - Object with key-value pairs
 * @param formats - Format method for each key
 * @param options - Humanize options
 * @param separator - Separator between pairs (default: ', ')
 * @param keyValueSeparator - Separator between key and value (default: ': ')
 * @returns Formatted string
 */
export function formatKeyValue(
  data: Record<string, number>,
  formats: Record<string, FormatMethod> = {},
  options: HumanizeOptions = {},
  separator: string = ", ",
  keyValueSeparator: string = ": "
): string {
  return Object.entries(data)
    .map(([key, value]) => {
      const formatMethod = formats[key] || "generic";
      const formattedValue = humanizeNumber(value, formatMethod, options);
      return `${key}${keyValueSeparator}${formattedValue}`;
    })
    .join(separator);
}

/**
 * Format a table row with multiple columns
 *
 * @param row - Array of values
 * @param formats - Array of format methods for each column
 * @param options - Humanize options
 * @param separator - Column separator (default: '\t')
 * @returns Formatted string
 */
export function formatTableRow(
  row: number[],
  formats: (FormatMethod | [FormatMethod, HumanizeOptions?])[] = [],
  options: HumanizeOptions = {},
  separator: string = "\t"
): string {
  return row
    .map((value, index) => {
      const formatConfig = formats[index] || "generic";
      if (Array.isArray(formatConfig)) {
        return humanizeNumber(value, formatConfig[0], {
          ...options,
          ...formatConfig[1],
        });
      }
      return humanizeNumber(value, formatConfig, options);
    })
    .join(separator);
}
