# 🎓 Developer Quick Start Guide

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📁 Using Constants

### Before (❌ Old Way)

```tsx
const isStudent = role === "Student";
const isAdminPage = location.pathname === "/reports";
const delays = [500, 300, 1000];
```

### After (✅ New Way)

```tsx
import { USER_ROLES, ROUTES, API_CONFIG } from "../constants/appConstants";

const isStudent = role === USER_ROLES.STUDENT;
const isAdminPage = location.pathname === ROUTES.REPORTS;
const delay = API_CONFIG.DELAY_MS;
```

---

## 🛠️ Using Utilities

### Formatting Dates

```tsx
import { formatDate, formatDateForTable } from "../utils/helpers";

const fullDate = formatDate(new Date()); // "November 26, 2025"
const tableDate = formatDateForTable(new Date()); // "Mon, Nov 26"
```

### Working with Ratings

```tsx
import { getRatingLabel } from "../utils/helpers";

const label = getRatingLabel(5); // "Excellent"
const label = getRatingLabel(0); // "Select a rating"
```

### File Size Formatting

```tsx
import { formatFileSize } from "../utils/helpers";

const size = formatFileSize(2048); // "2.0 KB"
```

### Email Validation

```tsx
import { isValidEmail } from "../utils/helpers";

if (isValidEmail(email)) {
	// Valid email
}
```

### Other Utilities

```tsx
import {
	calculateAverage,
	truncateString,
	delay,
	safeJsonParse,
	classNames,
} from "../utils/helpers";

// Calculate average
const avg = calculateAverage([1, 2, 3, 4, 5]); // 3

// Truncate text
const text = truncateString("Hello World", 5); // "Hello..."

// Async delay
await delay(500);

// Safe JSON parse
const data = safeJsonParse(jsonString, {});

// Conditional classes
const classes = classNames({
	"bg-blue-600": isActive,
	"hover:bg-blue-700": true,
	"text-white": true,
});
```

---

## 🧩 Component Patterns

### Creating a New Component

```tsx
import React from "react";
import type { SomeType } from "../../types/file";

interface MyComponentProps {
	title: string;
	onSubmit: (value: string) => void;
	isLoading?: boolean;
}

/**
 * MyComponent Description
 * Brief explanation of what this component does
 * and how to use it.
 */
const MyComponent: React.FC<MyComponentProps> = ({
	title,
	onSubmit,
	isLoading = false,
}) => {
	// State
	const [value, setValue] = React.useState("");

	// Handlers
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(value);
	};

	// JSX
	return (
		<div className="bg-white rounded-lg shadow-sm p-6">
			<h2 className="text-xl font-semibold text-gray-900 mb-4">
				{title}
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="w-full border rounded-md p-2"
				/>
				<button
					type="submit"
					disabled={isLoading}
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
				>
					{isLoading ? "Loading..." : "Submit"}
				</button>
			</form>
		</div>
	);
};

export default MyComponent;
```

---

## 📝 Type Definitions

### Creating New Types

```tsx
// src/types/myFeature.ts

/**
 * User profile data
 */
export interface UserProfile {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	joinedDate: Date;
}

/**
 * Request payload for creating user
 */
export interface CreateUserRequest {
	name: string;
	email: string;
	role: UserRole;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
	data: T;
	status: "success" | "error";
	message?: string;
}
```

---

## 🔐 Service/API Patterns

### Creating Service Functions

```tsx
// src/services/userService.ts

import type { User, CreateUserRequest } from "../types/user";
import { API_CONFIG } from "../constants/appConstants";

/**
 * Fetch user by ID
 * @param userId - The user ID to fetch
 * @returns Promise with user data
 * @throws Error if user not found
 */
export const getUser = async (userId: string): Promise<User> => {
	try {
		await new Promise((resolve) =>
			setTimeout(resolve, API_CONFIG.DELAY_MS)
		);

		const user = MOCK_USERS.find((u) => u.id === userId);
		if (!user) {
			throw new Error("User not found");
		}

		return user;
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw error;
	}
};

/**
 * Create new user
 * @param data - User creation data
 * @returns Promise with created user
 */
export const createUser = async (data: CreateUserRequest): Promise<User> => {
	try {
		await new Promise((resolve) =>
			setTimeout(resolve, API_CONFIG.DELAY_MS)
		);

		const newUser: User = {
			id: generateMockId(),
			...data,
			joinedDate: new Date(),
		};

		MOCK_USERS.push(newUser);
		return newUser;
	} catch (error) {
		console.error("Failed to create user:", error);
		throw error;
	}
};
```

---

## 🎨 Common Tailwind Patterns

### Card Component

```tsx
<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
	{/* Content */}
</div>
```

### Button Variants

```tsx
// Primary
<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
  Primary
</button>

// Secondary
<button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
  Secondary
</button>

// Danger
<button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
  Delete
</button>
```

### Badge/Tag

```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
	Badge
</span>
```

### Empty State

```tsx
<div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
	<Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
	<h3 className="text-lg font-medium text-gray-900">No Data</h3>
	<p className="text-gray-500 mt-2">No items to display</p>
</div>
```

---

## 🔄 State Management

### Context Usage

```tsx
import { useAuth } from "../context/AuthContext";

const MyComponent = () => {
	const { user, isAuthenticated, login, logout } = useAuth();

	return (
		<div>
			{isAuthenticated ? (
				<p>Welcome, {user?.name}</p>
			) : (
				<p>Please login</p>
			)}
		</div>
	);
};
```

### Local State with Hooks

```tsx
// For single values
const [count, setCount] = useState(0);

// For objects
const [form, setForm] = useState({
	name: "",
	email: "",
	message: "",
});

// Update object
setForm((prev) => ({
	...prev,
	name: "New Name",
}));
```

---

## 🚫 Common Mistakes to Avoid

### ❌ Using hardcoded strings

```tsx
// DON'T
if (role === 'Student') { ... }
```

### ✅ Use constants instead

```tsx
import { USER_ROLES } from '../constants/appConstants';

// DO
if (role === USER_ROLES.STUDENT) { ... }
```

### ❌ Missing JSDoc

```tsx
export const formatData = (data) => {
	// ...
};
```

### ✅ Add documentation

```tsx
/**
 * Format data for display
 * @param data - Raw data object
 * @returns Formatted data string
 */
export const formatData = (data: any): string => {
	// ...
};
```

### ❌ Inline date calculations

```tsx
const date = new Date("2025-11-26");
```

### ✅ Use utility functions

```tsx
import { formatDate } from "../utils/helpers";

const date = formatDate(new Date());
```

---

## 🧪 Debugging Tips

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Inspect component state and props
4. Use Profiler to identify performance issues

### Console Logging

```tsx
// Good practice
console.error("Failed to fetch user:", error);
console.warn("Deprecated function used");
console.info("Operation completed");

// With context
console.group("UserData");
console.log("User:", user);
console.log("Role:", role);
console.groupEnd();
```

---

## 📚 Resources

-   [React Docs](https://react.dev)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)
-   [Tailwind CSS](https://tailwindcss.com/docs)
-   [React Router](https://reactrouter.com)
-   [Project CODE_STRUCTURE.md](./CODE_STRUCTURE.md)

---

## 🆘 Getting Help

1. Check `CODE_STRUCTURE.md` for project guidelines
2. Look at similar components for patterns
3. Check `appConstants.ts` for available constants
4. Check `helpers.ts` for available utilities
5. Search codebase for examples

---

**Happy Coding! 🎉**
