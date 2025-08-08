"use client";
import { useDashboard } from "@/context/dashboard-context";
import Sidebar from "../ui/navigation/sidebar";
import TabSection from "../ui/tabs/tab-section";
import DashboardHeader from "./dashboard-header";

const MAIN_BASE_STYLES =
	"flex-1 flex flex-col transition-all duration-300 w-full max-w-full xl:max-w-[1080px]";

const DashboardContainer = () => {
	const { isSidebarOpen, isMobile, closeSidebar } = useDashboard();

	const handleOverlayClick = () => {
		closeSidebar();
	};

	const handleOverlayKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Escape") {
			closeSidebar();
		}
	};

	return (
		<div className="flex space-x-2 sm:space-x-4 lg:space-x-12">
			<Sidebar
				isMobile={isMobile}
				isOpen={isSidebarOpen}
				onClose={closeSidebar}
			/>

			{/* Mobile overlay */}
			{isMobile && isSidebarOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={handleOverlayClick}
					onKeyDown={handleOverlayKeyDown}
					role="button"
					tabIndex={0}
					aria-label="Close sidebar"
				/>
			)}

			<main className={MAIN_BASE_STYLES} role="main">
				<DashboardHeader />
				<TabSection />
			</main>
		</div>
	);
};

export default DashboardContainer;
