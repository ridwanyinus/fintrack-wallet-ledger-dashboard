import { mockSummary } from "@/lib/data/mock-data";
import SummaryCard from "../ui/cards/summary-card";
import { formatCurrency } from "@/lib/utils/formatters";

const SUMMARY_CONFIG = [
	{
		id: "balance",
		title: "Total Balance",
		value: mockSummary.totalBalance,
		change: mockSummary.balanceChange,
		format: "currency" as const,
	},
	{
		id: "credits",
		title: "Total Credits",
		value: mockSummary.totalCredits,
		change: mockSummary.creditsChange,
		format: "currency" as const,
	},
	{
		id: "debits",
		title: "Total Debits",
		value: mockSummary.totalDebits,
		change: mockSummary.debitsChange,
		format: "currency" as const,
	},
	{
		id: "transactions",
		title: "Total Transactions",
		value: mockSummary.transactionCount,
		change: mockSummary.transactionChange,
		format: "number" as const,
	},
] as const;

const SummaryCards = () => {
	return (
		<section className="mb-8" aria-labelledby="summary-heading">
			<h2 id="summary-heading" className="font-bold text-xl mb-4">
				Summary
			</h2>
			<div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
				role="list"
				aria-label="Financial summary cards"
			>
				{SUMMARY_CONFIG.map((item) => (
					<div key={item.id} role="listitem">
						<SummaryCard
							title={item.title}
							detail={
								item.format === "currency"
									? formatCurrency(item.value)
									: item.value.toLocaleString()
							}
							percent={item.change}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default SummaryCards;
