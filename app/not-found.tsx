import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="text-center p-8 max-w-md mx-auto">
        <h1 className="text-8xl font-extrabold text-black animate-pulse">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-semibold text-black">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-black">
          Oops! It seems you’ve wandered into the unknown. The page you’re
          looking for doesn’t exist.
        </p>
        <Link href="/">
          <button className="mt-8 px-6 py-3 bg-white text-purple-600 font-medium rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
