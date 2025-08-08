import Image from "next/image";

interface SummaryCardProps {
	title: string;
	detail: string;
	percent: number;
}

const CARD_STYLES = {
	container:
		"bg-forest-green-9/10 p-4 sm:p-6 lg:p-7 rounded-[20px] lg:h-[158px] flex flex-col justify-center mt-4",
	header: "flex justify-between items-start",
	title: "text-base-custom font-bold text-brick-brown-62",
	menuButton:
		"p-1 -m-1 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-blue focus:ring-offset-2 transition-colors hover:bg-forest-green-9/20",
	content: "grid pt-3 space-y-0.5",
	detail: "text-2xl font-bold text-4xl-custom text-foreground",
	percent: "font-medium text-xs-custom text-steel",
} as const;

const SummaryCard = ({ title, detail, percent }: SummaryCardProps) => {
	const handleMenuClick = () => {
		// TODO: Implement card menu functionality
		console.log(`Menu clicked for ${title}`);
	};

	const formatPercent = (value: number) => {
		const sign = value > 0 ? "+" : "";
		return `${sign}${value}%`;
	};

	const getPercentColor = (value: number) => {
		if (value > 0) return "text-sea-green";
		if (value < 0) return "text-red-brick";
		return "text-steel";
	};

	return (
		<article className={CARD_STYLES.container}>
			<header className={CARD_STYLES.header}>
				<h3 className={CARD_STYLES.title}>{title}</h3>
				<button
					type="button"
					onClick={handleMenuClick}
					className={CARD_STYLES.menuButton}
					aria-label={`Options for ${title}`}
				>
					<Image
						src="/ellipsis.svg"
						width={24}
						height={25}
						alt=""
						aria-hidden="true"
					/>
				</button>
			</header>

			<div className={CARD_STYLES.content}>
				<div className={CARD_STYLES.detail}>{detail}</div>
				<div className={`${CARD_STYLES.percent} ${getPercentColor(percent)}`}>
					<span aria-label={`Change: ${formatPercent(percent)}`}>
						{formatPercent(percent)}
					</span>
				</div>
			</div>
		</article>
	);
};

export default SummaryCard;
