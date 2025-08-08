import type { Metadata, Viewport } from "next";
import { DashboardProvider } from "@/context/dashboard-context";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
	title: "FinTrack - Wallet Ledger Dashboard",
	description:
		"Comprehensive financial dashboard for tracking wallet transactions, managing credits and debits, and monitoring financial health.",
	keywords: [
		"wallet",
		"ledger",
		"dashboard",
		"finance",
		"transactions",
		"fintech",
	],
	authors: [{ name: "FinTrack Team" }],
	creator: "FinTrack",
	publisher: "FinTrack",
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		title: "FinTrack - Wallet Ledger Dashboard",
		description:
			"Comprehensive financial dashboard for tracking wallet transactions and managing your finances.",
		siteName: "FinTrack",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased" suppressHydrationWarning>
				<Link
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:no-underline"
				>
					Skip to main content
				</Link>

				<DashboardProvider>{children}</DashboardProvider>
			</body>
		</html>
	);
}
