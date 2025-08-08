interface HamburgerIconProps {
	isOpen: boolean;
}

const HAMBURGER_STYLES = {
	container: "w-5 h-6 flex flex-col justify-center items-center gap-1 bg-white",
	line: {
		base: "w-5 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
		topOpen: "rotate-45 translate-y-1.5",
		middleOpen: "opacity-0",
		bottomOpen: "-rotate-45 -translate-y-1.5",
	},
} as const;

export default function HamburgerIcon({ isOpen }: HamburgerIconProps) {
	const getLineClasses = (position: "top" | "middle" | "bottom") => {
		const baseClasses = HAMBURGER_STYLES.line.base;

		if (!isOpen) return baseClasses;

		switch (position) {
			case "top":
				return `${baseClasses} ${HAMBURGER_STYLES.line.topOpen}`;
			case "middle":
				return `${baseClasses} ${HAMBURGER_STYLES.line.middleOpen}`;
			case "bottom":
				return `${baseClasses} ${HAMBURGER_STYLES.line.bottomOpen}`;
			default:
				return baseClasses;
		}
	};

	return (
		<div
			className={HAMBURGER_STYLES.container}
			role="img"
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-hidden="false"
		>
			<div className={getLineClasses("top")} aria-hidden="true" />
			<div className={getLineClasses("middle")} aria-hidden="true" />
			<div className={getLineClasses("bottom")} aria-hidden="true" />
			<span className="sr-only">
				{isOpen ? "Menu is open" : "Menu is closed"}
			</span>
		</div>
	);
}
