'use client'

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
        <div>
            <input
                type="text"
                placeholder="Search for users"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ color: "#000", background: "#fff", padding: "8px", fontSize: "16px" }}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div>
                {results.length === 0 && !error ? (
                    <p>No results found</p>
                ) : (
                    results.map((user) => (
                        <div key={user._id}>
                            <img src={user.profile_img} alt={`${user.username} profile`} width="50" />
                            <p>{user.username} - {user.full_name}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExploreSearch;
