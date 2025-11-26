/**
 * Application Constants
 * Centralized constants for the entire application
 */

// ============ API & Storage ============
export const API_CONFIG = {
  DELAY_MS: 500, // Mock API delay
} as const;

export const STORAGE_CONFIG = {
  USER_KEY: 'user',
} as const;

// ============ Routes ============
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  DASHBOARD: '/dashboard',
  REPORTS: '/reports',
  MY_SESSIONS: '/my-sessions',
  BOOK_SESSION: '/book-session',
  SET_AVAILABILITY: '/set-availability',
  FEEDBACK: '/feedback',
  FEEDBACK_SESSION: '/feedback/:sessionId',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:courseId',
  PROFILE: '/profile',
} as const;

// ============ User Roles ============
export const USER_ROLES = {
  STUDENT: 'Student',
  TUTOR: 'Tutor',
  ADMIN: 'Admin',
} as const;

// ============ Session Status ============
export const SESSION_STATUS = {
  SCHEDULED: 'Scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// ============ Rating Scale ============
export const RATING_SCALE = [1, 2, 3, 4, 5] as const;
export const RATING_LABELS = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] as const;

// ============ Course Categories ============
export const COURSE_CATEGORIES = {
  PROGRAMMING: 'Programming',
  SOFTWARE_ENGINEERING: 'Software Engineering',
  DATABASE: 'Database',
  AI_MACHINE_LEARNING: 'AI & Machine Learning',
  NETWORKS: 'Networks',
} as const;

// ============ Status Badges ============
export const STATUS_BADGE_CONFIG = {
  completed: {
    colors: 'bg-green-100 text-green-800',
    label: 'Completed',
  },
  scheduled: {
    colors: 'bg-blue-100 text-blue-800',
    label: 'Scheduled',
  },
  cancelled: {
    colors: 'bg-red-100 text-red-800',
    label: 'Cancelled',
  },
} as const;

// ============ Pagination ============
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
} as const;

// ============ Timeouts ============
export const TIMEOUTS = {
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
} as const;

// ============ File Size ============
export const FILE_SIZE = {
  MAX_UPLOAD_SIZE_MB: 10,
  KB_DIVISOR: 1024,
} as const;
