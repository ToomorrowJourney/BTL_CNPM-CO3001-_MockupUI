/**
 * Utility Functions
 * Helper functions used throughout the application
 */

import { RATING_LABELS } from '../constants/appConstants';

/**
 * Format file size in bytes to human readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string (e.g., "2.5 KB")
 */
export const formatFileSize = (bytes: number): string => {
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} KB`;
};

/**
 * Get rating label by rating value
 * @param rating - Rating value (1-5)
 * @returns Rating label or "Select a rating"
 */
export const getRatingLabel = (rating: number): string => {
  return rating > 0 && rating <= RATING_LABELS.length
    ? RATING_LABELS[rating - 1]
    : 'Select a rating';
};

/**
 * Format date to local date string
 * @param date - Date object or string
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(undefined, options);
};

/**
 * Format date for table display (e.g., "Mon, Dec 2")
 * @param date - Date object or string
 * @returns Formatted date string
 */
export const formatDateForTable = (date: Date | string): string => {
  return formatDate(date, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculate average from array of numbers
 * @param numbers - Array of numbers
 * @returns Average value rounded to 1 decimal place
 */
export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  return parseFloat(
    (numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length).toFixed(1)
  );
};

/**
 * Generate random ID for mock data
 * @returns Random ID string
 */
export const generateMockId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if string is valid email
 * @param email - Email string to validate
 * @returns True if valid email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Truncate string to specified length with ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @returns Truncated string
 */
export const truncateString = (str: string, maxLength: number): string => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

/**
 * Simulate async delay
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Safe JSON parse with fallback
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    console.error('Failed to parse JSON:', json);
    return fallback;
  }
};

/**
 * Merge class names conditionally
 * @param classes - Object with class names and boolean conditions
 * @returns Merged class names string
 */
export const classNames = (classes: Record<string, boolean>): string => {
  return Object.keys(classes)
    .filter((key) => classes[key])
    .join(' ');
};
