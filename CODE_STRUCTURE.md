# Project Code Structure & Guidelines

## 📁 Directory Structure

```
src/
├── components/           # Reusable React components
│   ├── courses/         # Course-related components
│   │   ├── CourseCard.tsx
│   │   ├── FeedbackView.tsx
│   │   ├── SyllabusView.tsx
│   │   └── TeachingPlanView.tsx
│   └── layout/
│       └── MainLayout.tsx
├── pages/               # Page components for routing
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── CoursesPage.tsx
│   ├── CourseDetailPage.tsx
│   └── ...
├── services/            # API calls and business logic
│   ├── mockData.ts
│   └── statsService.ts
├── context/             # React Context for state management
│   └── AuthContext.ts
├── types/               # TypeScript type definitions
│   ├── user.ts
│   ├── course.ts
│   ├── session.ts
│   └── ...
├── constants/           # Application constants
│   └── appConstants.ts
├── utils/               # Utility functions
│   └── helpers.ts
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🏗️ Code Organization

### Components (`src/components/`)

-   **Purpose**: Reusable UI components
-   **Structure**:
    -   Props interface definition at the top
    -   JSDoc comments for components
    -   Functional components with hooks
    -   Memoization where necessary

### Pages (`src/pages/`)

-   **Purpose**: Full page components for routes
-   **Structure**:
    -   Page layout structure
    -   Integrates multiple components
    -   Handles page-level state

### Services (`src/services/`)

-   **Purpose**: Business logic and API calls
-   **Files**:
    -   `mockData.ts`: Mock data for development
    -   `statsService.ts`: Statistics calculations
-   **Convention**:
    -   Async functions with proper error handling
    -   JSDoc comments for all exported functions
    -   Consistent naming: `get*`, `create*`, `update*`, `delete*`

### Context (`src/context/`)

-   **Purpose**: Global state management with React Context
-   **Current**: Authentication context
-   **Structure**:
    -   Create context with type definition
    -   Provider component
    -   Custom hook for consuming context

### Types (`src/types/`)

-   **Purpose**: TypeScript type definitions and interfaces
-   **Convention**:
    -   One main type per file or related types in one file
    -   Clear naming with interfaces
    -   JSDoc for complex types

### Constants (`src/constants/`)

-   **Purpose**: Centralized constants for the application
-   **Current**: `appConstants.ts`
-   **Content**:
    -   Routes
    -   User roles
    -   Status values
    -   Configuration values

### Utils (`src/utils/`)

-   **Purpose**: Reusable utility functions
-   **Current**: `helpers.ts`
-   **Convention**:
    -   Pure functions
    -   No side effects
    -   JSDoc documentation

## 📋 Code Style Guide

### Component Structure

```tsx
import React, { useState } from "react";
import type { SomeType } from "../../types/file";

interface ComponentProps {
	prop1: string;
	prop2: number;
	onAction: (value: string) => void;
}

/**
 * Component Description
 * @component
 * @example
 * return <MyComponent prop1="test" prop2={5} onAction={handleAction} />
 */
const MyComponent: React.FC<ComponentProps> = ({ prop1, prop2, onAction }) => {
	const [state, setState] = useState("");

	const handleClick = () => {
		setState("new value");
		onAction("action triggered");
	};

	return <div onClick={handleClick}>{prop1}</div>;
};

export default MyComponent;
```

### Function Documentation

```tsx
/**
 * Brief description of what the function does
 * @param param1 - Description of param1
 * @param param2 - Description of param2
 * @returns Description of return value
 */
export const functionName = (param1: string, param2: number): string => {
	// Implementation
	return result;
};
```

## 🎨 Tailwind CSS Classes

-   Use responsive prefixes: `sm:`, `md:`, `lg:`
-   Combine classes logically with spaces
-   Use consistent spacing: `space-y-4`, `gap-2`
-   Color scheme: `text-gray-900`, `bg-blue-600`

### Example

```tsx
<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
	<h2 className="text-xl font-semibold text-gray-900 mb-4">Title</h2>
</div>
```

## 🚀 Best Practices

### Performance

1. Memoize expensive calculations with `useMemo`
2. Use `useCallback` for event handlers passed to children
3. Lazy load components for large features

### Error Handling

1. Use try-catch for async operations
2. Provide meaningful error messages
3. Always have fallback UI

### Types

1. Define interfaces at file top
2. Use `type` for simple types, `interface` for objects
3. Avoid `any` type

### State Management

1. Keep state as close to where it's used
2. Use Context only for global state
3. Minimize re-renders with proper memoization

### Comments

1. Explain "why", not "what"
2. Use JSDoc for public functions/components
3. Use meaningful variable names to reduce need for comments

## 📦 Dependencies

-   **React 19**: UI library
-   **React Router v7**: Client-side routing
-   **TypeScript**: Type safety
-   **Tailwind CSS**: Utility-first CSS
-   **Lucide React**: Icon library
-   **Recharts**: Charts and graphs
-   **date-fns**: Date manipulation

## 🔄 Recent Refactoring

### Improvements Made

1. ✅ Added JSDoc comments to all components and functions
2. ✅ Extracted constants to `appConstants.ts`
3. ✅ Created utility functions in `helpers.ts`
4. ✅ Improved component structure and readability
5. ✅ Added type safety improvements
6. ✅ Enhanced error handling
7. ✅ Added loading skeletons and empty states
8. ✅ Improved accessibility with ARIA labels
9. ✅ Optimized performance with useMemo

### Files Modified

-   `src/App.tsx` - Added better loading state
-   `src/context/AuthContext.ts` - Improved error handling and docs
-   `src/components/layout/MainLayout.tsx` - Added mobile menu, better organization
-   `src/components/courses/CourseCard.tsx` - Extracted constants, improved structure
-   `src/components/courses/FeedbackView.tsx` - Added helper functions, better organization
-   `src/components/courses/SyllabusView.tsx` - Added components, improved readability
-   `src/components/courses/TeachingPlanView.tsx` - Extracted status badge component
-   `src/services/mockData.ts` - Added documentation
-   **NEW** `src/constants/appConstants.ts` - Centralized constants
-   **NEW** `src/utils/helpers.ts` - Utility functions

## 🚨 Common Issues & Solutions

### Issue: Unused imports

**Solution**: Remove unused imports before committing

### Issue: Missing type definitions

**Solution**: Create interface/type before using in component

### Issue: Performance issues

**Solution**: Use React DevTools Profiler to identify slow components

## 📚 Resources

-   [React Documentation](https://react.dev)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)
-   [Tailwind CSS Docs](https://tailwindcss.com/docs)
-   [React Router Docs](https://reactrouter.com)
