import DashboardContainer from "@/components/dashboard/dashboard-container";
import Navbar from "@/components/ui/navigation/navbar";

export default function DashboardPage() {
	return (
		<div className="mx-auto w-full max-w-xxl px-4 sm:px-6 lg:px-12">
			<Navbar />
			<main id="main-content" className="min-h-screen">
				<DashboardContainer />
			</main>
		</div>
	);
}
