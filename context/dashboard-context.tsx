"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface DashBoardType {
	isSidebarOpen: boolean;
	isMobile: boolean;
	toggleSidebar: () => void;
	closeSidebar: () => void;
}

const DashboardContext = createContext<DashBoardType | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (isSidebarOpen && isMobile) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isSidebarOpen, isMobile]);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
	const closeSidebar = () => setIsSidebarOpen(false);

	return (
		<DashboardContext
			value={{
				isSidebarOpen,
				isMobile,
				toggleSidebar,
				closeSidebar,
			}}
		>
			{children}
		</DashboardContext>
	);
}

export function useDashboard() {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error(
			"useDashboard Context must be used within DashboardProvider",
		);
	}
	return context;
}
