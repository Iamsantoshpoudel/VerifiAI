import Link from "next/link";
export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-16 text-center">
        <h1 className="text-7xl font-bold mb-6 text-red-500">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg mb-8 max-w-xl">
          Oops! The page you are looking for does 
          not exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }
  