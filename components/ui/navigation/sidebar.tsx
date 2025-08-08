import Link from "next/link";
import { navigationItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

interface SidebarProps {
	isOpen: boolean;
	isMobile: boolean;
	onClose: () => void;
}

const SIDEBAR_STYLES = {
	base: "transition-transform duration-300 ease-in-out",
	mobile: {
		base: "fixed top-0 left-0 z-50 bg-forest-green-9 text-white",
		open: "translate-x-0",
		closed: "-translate-x-full",
		width: "w-[80vw] sm:w-[60vw]",
	},
	desktop: {
		base: "relative",
		open: "xl:w-54 2xl:w-80",
		closed: "w-0 overflow-hidden",
	},
	content: "h-screen pt-20 lg:pt-6",
	nav: "flex flex-col gap-y-4",
} as const;

const LINK_STYLES = {
	base: "px-4 sm:px-6 rounded-2xl py-1 font-medium transition-colors text-left block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-forest-green-9",
	active: "bg-ocean-gray-16/16",
	activeMobile: "bg-white text-foreground",
	hover: "hover:bg-gray-200 hover:bg-opacity-20 hover:text-foreground",
} as const;

export default function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
	const getSidebarClasses = () => {
		if (isMobile) {
			return cn(
				SIDEBAR_STYLES.base,
				SIDEBAR_STYLES.mobile.base,
				SIDEBAR_STYLES.mobile.width,
				isOpen ? SIDEBAR_STYLES.mobile.open : SIDEBAR_STYLES.mobile.closed,
			);
		}

		return cn(
			SIDEBAR_STYLES.base,
			SIDEBAR_STYLES.desktop.base,
			isOpen ? SIDEBAR_STYLES.desktop.open : SIDEBAR_STYLES.desktop.closed,
		);
	};

	const getLinkClasses = (isActive: boolean) => {
		return cn(
			LINK_STYLES.base,
			isActive && LINK_STYLES.active,
			isActive && isMobile && LINK_STYLES.activeMobile,
			!isActive && LINK_STYLES.hover,
		);
	};

	const handleLinkClick = () => {
		if (isMobile) {
			onClose();
		}
	};

	return (
		<aside
			className={getSidebarClasses()}
			aria-label="Main navigation"
			id="sidebar-navigation"
			aria-hidden={!isOpen}
		>
			<div className={SIDEBAR_STYLES.content}>
				<nav
					className={SIDEBAR_STYLES.nav}
					role="navigation"
					aria-label="Primary navigation"
				>
					{navigationItems.map((item) => (
						<Link
							key={item.name}
							href={item.route}
							onClick={handleLinkClick}
							className={getLinkClasses(item.active)}
							aria-current={item.active ? "page" : undefined}
						>
							{item.name}
						</Link>
					))}
				</nav>
			</div>
		</aside>
	);
}
