import React, { useState, useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
	Bell,
	MessageSquare,
	User as UserIcon,
	LogOut,
	Menu,
	X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Navigation menu items
const NAVIGATION_ITEMS = [
	{ path: "/", label: "Home" },
	{ path: "/dashboard", label: "Dashboard" },
	{ path: "/reports", label: "Reports" },
	{ path: "/my-sessions", label: "My Sessions" },
	{ path: "/courses", label: "Courses" },
];

/**
 * MainLayout Component
 * Main application layout with header, navigation, and footer
 */
const MainLayout: React.FC = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	/**
	 * Check if route is active
	 */
	const isActive = useMemo(
		() => (path: string) =>
			location.pathname === path
				? "bg-blue-700 text-white"
				: "text-white hover:bg-blue-600",
		[location.pathname]
	);

	/**
	 * Handle logout and redirect
	 */
	const handleLogout = () => {
		logout();
		setShowProfileMenu(false);
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Header / Navbar */}
			<header className="bg-hcmut-blue text-white shadow-md sticky top-0 z-50">
				<div className="px-4 sm:px-10 h-16 flex items-center justify-between">
					{/* Left Side: Logo & Navigation */}
					<div className="flex items-center space-x-4 sm:space-x-8">
						{/* Logo */}
						<div className="flex items-center">
							<img
								src="/src/assets/01_logobachkhoatoi.png"
								alt="BK TP.HCM"
								className="h-10 w-auto"
							/>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex space-x-1">
							{NAVIGATION_ITEMS.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
										item.path
									)}`}
								>
									{item.label}
								</Link>
							))}
						</nav>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setShowMobileMenu(!showMobileMenu)}
							className="md:hidden p-1 rounded-full hover:bg-blue-600"
						>
							{showMobileMenu ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>

					{/* Right Side: Icons & Profile */}
					<div className="flex items-center space-x-4 sm:space-x-6">
						{/* Notification & Message Buttons */}
						<button
							className="p-1 rounded-full hover:bg-blue-600 focus:outline-none transition-colors"
							aria-label="Notifications"
							title="Notifications"
						>
							<Bell className="w-6 h-6" />
						</button>
						<button
							className="p-1 rounded-full hover:bg-blue-600 focus:outline-none transition-colors"
							aria-label="Messages"
							title="Messages"
						>
							<MessageSquare className="w-6 h-6" />
						</button>

						{/* Profile Dropdown */}
						<div className="relative">
							<button
								onClick={() =>
									setShowProfileMenu(!showProfileMenu)
								}
								className="flex items-center space-x-2 p-1 rounded-full hover:bg-blue-600 focus:outline-none transition-colors"
								aria-label="Profile menu"
							>
								<div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border-2 border-white flex-shrink-0">
									{user?.avatarUrl ? (
										<img
											src={user.avatarUrl}
											alt={user.name}
											className="w-full h-full object-cover"
										/>
									) : (
										<UserIcon className="w-full h-full p-1 text-gray-500" />
									)}
								</div>
							</button>

							{/* Profile Dropdown Menu */}
							{showProfileMenu && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 ring-1 ring-black ring-opacity-5">
									<div className="px-4 py-2 border-b text-sm">
										<p className="font-bold">
											{user?.name}
										</p>
										<p className="text-xs text-gray-500 truncate">
											{user?.email}
										</p>
									</div>
									<Link
										to="/profile"
										className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
										onClick={() =>
											setShowProfileMenu(false)
										}
									>
										Your Profile
									</Link>
									<button
										onClick={handleLogout}
										className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center transition-colors"
									>
										<LogOut className="w-4 h-4 mr-2" />
										Sign out
									</button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{showMobileMenu && (
					<nav className="md:hidden border-t border-blue-600 bg-blue-800">
						<div className="px-4 py-2 space-y-1">
							{NAVIGATION_ITEMS.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
										item.path
									)}`}
									onClick={() => setShowMobileMenu(false)}
								>
									{item.label}
								</Link>
							))}
						</div>
					</nav>
				)}
			</header>

			{/* Main Content Area */}
			<main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="bg-white border-t border-gray-200 mt-auto">
				<div className="max-w-7xl mx-auto py-4 px-4 text-center text-sm text-gray-500">
					© 2025 Ho Chi Minh City University of Technology
				</div>
			</footer>
		</div>
	);
};

export default MainLayout;
