// src/app/info/page.tsx
export default function InfoPage() {
    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">About Tetromino Jazz</h1>
            <p className="text-gray-700">
                This project is a modern take on a classic. Built with React and
                Redux, it uses smooth jazz to create a lo-fi gaming experience.
            </p>
            <div className="mt-6 space-x-4">
                <a href="/" className="text-blue-500 underline">
                    Play Game
                </a>
                <a href="/blog" className="text-blue-500 underline">
                    Read Dev Log
                </a>
            </div>
        </div>
    );
}
