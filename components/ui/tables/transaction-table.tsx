"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { mockTransactions } from "@/lib/data/mock-data";
import SummaryCards from "@/components/dashboard/summary-cards";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";

type SortColumn = "date" | "amount";
type SortOrder = "asc" | "desc";

const TABLE_STYLES = {
	container: "pb-7",
	desktopTable: "hidden md:block",
	table: "w-full border-separate border-spacing-x-4",
	headerCell:
		"text-left text-xs-custom font-medium text-brick-brown-62/60 py-0.5",
	sortButton:
		"flex gap-x-2 items-center focus:outline-none focus:ring-2 focus:ring-teal-blue focus:ring-offset-2 rounded-md p-1 -m-1 transition-colors hover:bg-forest-green-9/10",
	bodyCell: "border-t border-muted-blue-20/20 py-2",
	mobileContainer: "md:hidden",
	mobileHeader: "flex justify-between items-center mb-4",
	mobileTitle: "text-sm font-medium text-brick-brown-62/60",
	mobileSortButtons: "flex gap-2",
	mobileSortButton:
		"text-xs px-2 py-1 rounded flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-teal-blue focus:ring-offset-2 transition-colors hover:bg-forest-green-9/10",
	mobileList: "flex flex-col gap-4",
	mobileCard:
		"border border-muted-blue-20/20 rounded-lg p-4 shadow-sm bg-white",
	typeIndicator: {
		container:
			"flex items-center bg-forest-green-9/10 rounded-2xl px-2 py-1 space-x-2 w-[74px]",
		dot: "size-1.5 rounded-full",
		credit: "bg-sea-green",
		debit: "bg-red-brick",
	},
} as const;

const COLUMN_CONFIG = {
	date: { label: "Date", sortable: true, width: "w-auto" },
	remark: { label: "Remark", sortable: false, width: "w-[120px]" },
	amount: { label: "Amount", sortable: true, width: "w-[120px]" },
	currency: { label: "Currency", sortable: false, width: "w-[100px]" },
	type: { label: "Type", sortable: false, width: "w-[100px]" },
} as const;

const TransactionTable = () => {
	const [sortBy, setSortBy] = useState<SortColumn>("date");
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

	const sortedTransactions = useMemo(() => {
		return [...mockTransactions].sort((a, b) => {
			let comparison = 0;

			if (sortBy === "date") {
				comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
			} else if (sortBy === "amount") {
				comparison = a.amount - b.amount;
			}

			return sortOrder === "asc" ? comparison : -comparison;
		});
	}, [sortBy, sortOrder]);

	const handleSort = (column: SortColumn) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(column);
			setSortOrder("desc");
		}
	};

	const getSortIcon = (column: SortColumn) => {
		if (sortBy !== column) {
			return "/caret-down.svg";
		}
		return sortOrder === "asc" ? "/caret-up-icon.svg" : "/caret-down.svg";
	};

	const getAriaSort = (
		column: SortColumn,
	): "ascending" | "descending" | "none" => {
		if (sortBy !== column) return "none";
		return sortOrder === "asc" ? "ascending" : "descending";
	};

	const formatAmount = (amount: number, type: string) => {
		const formattedAmount = formatCurrency(Math.abs(amount));
		return type === "Credit" ? formattedAmount : `-${formattedAmount}`;
	};

	const getTypeIndicatorClasses = (type: string) => {
		return `${TABLE_STYLES.typeIndicator.dot} ${type === "Credit" ? TABLE_STYLES.typeIndicator.credit : TABLE_STYLES.typeIndicator.debit}`;
	};

	const SortButton = ({
		column,
		children,
		className = "",
	}: {
		column: SortColumn;
		children: React.ReactNode;
		className?: string;
	}) => (
		<button
			type="button"
			onClick={() => handleSort(column)}
			className={`${TABLE_STYLES.sortButton} ${className}`}
			aria-label={`Sort by ${column} ${sortBy === column && sortOrder === "asc" ? "descending" : "ascending"}`}
		>
			{children}
			<Image
				src={getSortIcon(column)}
				alt=""
				width={10}
				height={7}
				aria-hidden="true"
			/>
		</button>
	);

	return (
		<section
			className={TABLE_STYLES.container}
			aria-labelledby="transactions-heading"
		>
			<SummaryCards />

			{/* Desktop Table */}
			<div className={TABLE_STYLES.desktopTable}>
				<table
					className={TABLE_STYLES.table}
					role="table"
					aria-label="Transactions data table"
				>
					<caption className="sr-only">
						List of wallet transactions with date, remark, amount, currency, and
						type. Date and Amount columns are sortable.
					</caption>
					<thead>
						<tr role="row">
							<th
								className={`${TABLE_STYLES.headerCell} ${COLUMN_CONFIG.date.width}`}
								scope="col"
								aria-sort={getAriaSort("date")}
							>
								<SortButton column="date">
									{COLUMN_CONFIG.date.label}
								</SortButton>
							</th>
							<th
								className={`${TABLE_STYLES.headerCell} ${COLUMN_CONFIG.remark.width}`}
								scope="col"
							>
								<div className="flex gap-x-2 items-center">
									{COLUMN_CONFIG.remark.label}
									<Image
										src="/caret-down.svg"
										alt=""
										width={10}
										height={7}
										aria-hidden="true"
									/>
								</div>
							</th>
							<th
								className={`${TABLE_STYLES.headerCell} ${COLUMN_CONFIG.amount.width}`}
								scope="col"
								aria-sort={getAriaSort("amount")}
							>
								<SortButton column="amount">
									{COLUMN_CONFIG.amount.label}
								</SortButton>
							</th>
							<th
								className={`${TABLE_STYLES.headerCell} ${COLUMN_CONFIG.currency.width}`}
								scope="col"
							>
								<div className="flex gap-x-2 items-center">
									{COLUMN_CONFIG.currency.label}
									<Image
										src="/caret-down.svg"
										alt=""
										width={10}
										height={7}
										aria-hidden="true"
									/>
								</div>
							</th>
							<th
								className={`${TABLE_STYLES.headerCell} ${COLUMN_CONFIG.type.width}`}
								scope="col"
							>
								<div className="flex gap-x-2 items-center">
									{COLUMN_CONFIG.type.label}
									<Image
										src="/caret-down.svg"
										alt=""
										width={10}
										height={7}
										aria-hidden="true"
									/>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedTransactions.map((transaction) => (
							<tr key={transaction.id} role="row">
								<td className={TABLE_STYLES.bodyCell}>
									<time dateTime={transaction.date}>
										{formatDate(transaction.date)}
									</time>
								</td>
								<td className={TABLE_STYLES.bodyCell}>{transaction.remark}</td>
								<td className={TABLE_STYLES.bodyCell}>
									<span
										className={
											transaction.type === "Credit"
												? "text-sea-green"
												: "text-red-brick"
										}
									>
										{formatAmount(transaction.amount, transaction.type)}
									</span>
								</td>
								<td className={TABLE_STYLES.bodyCell}>
									{transaction.currency}
								</td>
								<td
									className={`py-4 whitespace-nowrap ${TABLE_STYLES.bodyCell}`}
								>
									<div
										className={TABLE_STYLES.typeIndicator.container}
										role="status"
										aria-label={`Transaction type: ${transaction.type}`}
									>
										<div
											className={getTypeIndicatorClasses(transaction.type)}
											aria-hidden="true"
										/>
										<span className="text-sm">{transaction.type}</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile Cards */}
			<div className={TABLE_STYLES.mobileContainer}>
				<div className={TABLE_STYLES.mobileHeader}>
					<h3
						className={TABLE_STYLES.mobileTitle}
						id="mobile-transactions-heading"
					>
						Recent Transactions
					</h3>
					<div
						className={TABLE_STYLES.mobileSortButtons}
						role="group"
						aria-label="Sort options"
					>
						<SortButton column="date" className={TABLE_STYLES.mobileSortButton}>
							Date
						</SortButton>
						<SortButton
							column="amount"
							className={TABLE_STYLES.mobileSortButton}
						>
							Amount
						</SortButton>
					</div>
				</div>

				<div
					className={TABLE_STYLES.mobileList}
					role="list"
					aria-labelledby="mobile-transactions-heading"
				>
					{sortedTransactions.map((transaction) => (
						<article
							key={transaction.id}
							className={TABLE_STYLES.mobileCard}
							role="listitem"
						>
							<div className="flex justify-between items-start mb-2">
								<div className="flex-1">
									<h4 className="font-medium mb-1">{transaction.remark}</h4>
									<time
										dateTime={transaction.date}
										className="text-sm text-brick-brown-62/60"
									>
										{formatDate(transaction.date)}
									</time>
								</div>
								<div className="text-right">
									<div
										className={`font-medium text-lg ${transaction.type === "Credit" ? "text-sea-green" : "text-red-brick"}`}
									>
										{formatAmount(transaction.amount, transaction.type)}
									</div>
									<div className="text-sm text-brick-brown-62/60">
										{transaction.currency}
									</div>
								</div>
							</div>

							<div className="flex justify-between items-center mt-3">
								<div
									className={TABLE_STYLES.typeIndicator.container}
									role="status"
									aria-label={`Transaction type: ${transaction.type}`}
								>
									<div
										className={getTypeIndicatorClasses(transaction.type)}
										aria-hidden="true"
									/>
									<span className="text-sm">{transaction.type}</span>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default TransactionTable;
