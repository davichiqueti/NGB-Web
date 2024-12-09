'use client';

import React, { useState } from "react";
import { searchUsers } from "../../../../services/userServices";

const ExploreSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const users = await searchUsers(query);
            setResults(users);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResults([]);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Explore</h1>

            <div className="w-full max-w-md flex items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search for users"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition"
                >
                    Search
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full max-w-md">
                {results.length === 0 && !error ? (
                    <p className="text-gray-800 text-center">No results found</p>
                ) : (
                    <div className="space-y-4">
                        {results.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-lg transition"
                            >
                                <img
                                    src={user.profile_img}
                                    alt={`${user.username} profile`}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-bold text-gray-800">{user.username}</p>
                                    <p className="text-gray-500">{user.full_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExploreSearch;
