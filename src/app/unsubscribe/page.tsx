export default function UnsubscribePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 text-center">
      <h1 className="text-3xl font-bold text-[#e5ff00] mb-4">You’re unsubscribed</h1>
      <p className="text-gray-300 max-w-md mb-8">
        You’ve been removed from our waitlist email list. We’re sad to see you go, 
        but you can rejoin anytime at <a href="/" className="text-[#e5ff00] underline">roastyourfriend.com</a>.
      </p>
      <a
        href="/"
        className="bg-[#e5ff00] text-black px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition"
      >
        Back to homepage
      </a>
    </div>
  );
}