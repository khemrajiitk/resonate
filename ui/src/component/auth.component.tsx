import { useState } from "react";

export const AuthComponent = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 w-full max-w-md">
                {/* Toggle Buttons */}
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-4 py-2 rounded-l-xl font-semibold transition ${isSignIn
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                            }`}
                        onClick={() => setIsSignIn(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-xl font-semibold transition ${!isSignIn
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                            }`}
                        onClick={() => setIsSignIn(false)}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    {!isSignIn && (
                        <div>
                            <label className="block mb-1 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};
