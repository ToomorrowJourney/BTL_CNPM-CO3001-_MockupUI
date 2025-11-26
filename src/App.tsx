import React from "react";
import type { ReactNode } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AdminReports from "./pages/AdminReports";
import MySessions from "./pages/MySessions";
import BookSession from "./pages/BookSession";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import SessionFeedback from "./pages/SessionFeedback";
import ProfilePage from "./pages/ProfilePage";
import SetAvailabilityPage from "./pages/SetAvailabilityPage";
import FeedbackPage from "./pages/FeedbackPage";

/**
 * ProtectedRoute Component
 * Wraps protected routes to check authentication status
 * Redirects to login if user is not authenticated
 */
interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hcmut-blue mx-auto mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

/**
 * App Component
 * Main application component with routing setup
 */
function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					{/* Public Routes */}
					<Route path="/login" element={<LoginPage />} />

					{/* Protected Routes */}
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<MainLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<HomePage />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="reports" element={<AdminReports />} />
						<Route path="my-sessions" element={<MySessions />} />
						<Route path="book-session" element={<BookSession />} />
						<Route
							path="set-availability"
							element={<SetAvailabilityPage />}
						/>
						<Route path="feedback" element={<FeedbackPage />} />
						<Route
							path="feedback/:sessionId"
							element={<SessionFeedback />}
						/>
						<Route path="courses" element={<CoursesPage />} />
						<Route
							path="courses/:courseId"
							element={<CourseDetailPage />}
						/>
						<Route path="profile" element={<ProfilePage />} />
					</Route>

					{/* Fallback Route */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
