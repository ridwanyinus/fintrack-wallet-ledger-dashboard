import Link from "next/link";

const page = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
			<div className="text-center text-gray-500">
				<h3 className="text-lg font-medium mb-2">Report Page</h3>
				<p>Report Page content would be displayed here.</p>
				<Link href="/" className="text-teal-blue">
					Navigate back to Home Page
				</Link>
			</div>
		</div>
	);
};

export default page;
