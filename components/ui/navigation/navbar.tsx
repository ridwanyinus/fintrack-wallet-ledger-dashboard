"use client";
import Image from "next/image";
import Link from "next/link";
import { useDashboard } from "@/context/dashboard-context";
import HamburgerIcon from "./hamburger-icon";

const Navbar = () => {
	const { isSidebarOpen, toggleSidebar } = useDashboard();

	const handleSearchClick = () => {
		// TODO: Implement search functionality
		console.log("Search clicked");
	};

	const handleAppsClick = () => {
		// TODO: Implement apps menu
		console.log("Apps clicked");
	};

	const handleProfileClick = () => {
		// TODO: Implement profile menu
		console.log("Profile clicked");
	};

	return (
		<header className="pt-2.5" role="banner">
			<div className="flex max-lg:justify-between lg:gap-[18.9375rem] h-16 relative">
				<div className="flex justify-center items-center gap-x-3.5 lg:gap-x-7">
					<button
						type="button"
						className="z-[995] p-2 -m-2 focus:outline-none focus:ring-2 focus:ring-ocean-gray-16 focus:ring-offset-2 rounded-md"
						onClick={toggleSidebar}
						aria-label={
							isSidebarOpen ? "Close navigation menu" : "Open navigation menu"
						}
						aria-expanded={isSidebarOpen}
						aria-controls="sidebar-navigation"
					>
						<HamburgerIcon isOpen={isSidebarOpen} />
					</button>

					<Link
						href="/"
						className="flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-ocean-gray-16 focus:ring-offset-2 rounded-md p-1"
						aria-label="FinTrack home"
					>
						<Image
							src="/logomark.svg"
							alt="FinTrack logo"
							width={32}
							height={32}
							priority
						/>
						<span className="text-teal-blue font-timmana text-lg lg:text-2xl tracking-tight leading-none h-2 lg:h-[15px]">
							FinTrack
						</span>
					</Link>
				</div>

				<div className="flex items-center justify-end md:min-w-[446.33px]">
					<nav
						aria-label="User navigation"
						className="flex items-center gap-3.5 lg:gap-7"
					>
						<button
							type="button"
							onClick={handleSearchClick}
							className="p-2 -m-2 focus:outline-none focus:ring-2 focus:ring-ocean-gray-16 focus:ring-offset-2 rounded-md"
							aria-label="Search"
						>
							<Image
								src="/search-icon.svg"
								alt=""
								width={24}
								height={24}
								aria-hidden="true"
							/>
						</button>

						<button
							type="button"
							onClick={handleAppsClick}
							className="hidden lg:block p-2 -m-2 focus:outline-none focus:ring-2 focus:ring-ocean-gray-16 focus:ring-offset-2 rounded-md"
							aria-label="Apps menu"
						>
							<Image
								src="/app-grid-Icon.svg"
								alt=""
								width={24}
								height={24}
								aria-hidden="true"
							/>
						</button>

						<button
							type="button"
							onClick={handleProfileClick}
							className="p-1 -m-1 focus:outline-none focus:ring-2 focus:ring-ocean-gray-16 focus:ring-offset-2 rounded-full"
							aria-label="User profile menu"
						>
							<Image
								src="/profile.png"
								alt="User profile"
								width={40}
								height={40}
								className="rounded-full"
							/>
						</button>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
