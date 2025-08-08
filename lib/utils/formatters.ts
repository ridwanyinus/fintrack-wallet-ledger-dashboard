export const formatCurrency = (amount: number): string => {
	return `$${Math.abs(amount).toLocaleString()}`;
};

export const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
};
