import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import RecentUser from "../components/RecentUser";
import UserCard from "../components/UserCard";

function Profile() {
  const [user, setUser] = useState({});
  const [findUser, setFindUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentVersion, setRecentVersion] = useState(0);
  const [query, setQuery] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const onSelect = (user) => {
    setSelectedUser(user);
  };

  const addRecentUser = (username) => {
    const gitUser = username.trim();
    if (!gitUser) return;

    const storedHistory = localStorage.getItem("history");

    let users = [];
    if (storedHistory) {
      try {
        const parsed = JSON.parse(storedHistory);
        users = Array.isArray(parsed?.users) ? parsed.users : [];
      } catch {
        users = [];
      }
    }

    const filteredHistory = users.filter((user) => user !== gitUser);
    const updatedHistory = [gitUser, ...filteredHistory].slice(0, 5);

    localStorage.setItem(
      "history",
      JSON.stringify({
        users: updatedHistory,
        timestamp: Date.now(),
      }),
    );
  };

  const fetchUser = async (uname = findUser) => {
    const userName = uname.trim();
    if (!userName) {
      setUser({});
      setError("Set username");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        // `https://api.github.com/search/users?q=${userName}h&per_page=6&page=1`,
        `https://api.github.com/users/${userName}`,
      );

      if (res.status === 404) {
        setUser({});
        setError("User Not Found");
        return null;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (!data) return;

      setUser(data);
      addRecentUser(userName);
      setRecentVersion((v) => v + 1);
    } catch (e) {
      setError(e.message || String(e));
      setUser({});
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
  };

  const handleRecentSelect = (uname) => {
    setFindUser(uname);
    fetchUser(uname);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-gray-800 p-4">
        <form
          className="flex w-full flex-col gap-2 sm:flex-row"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            name="searchUser"
            aria-label="Search GitHub username"
            value={findUser}
            onChange={(e) => setFindUser(e.target.value)}
            placeholder="Search GitHub user..."
            className="flex-1 rounded-md bg-amber-50 px-4 py-2 text-gray-800 outline-none"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-md border border-white bg-[#1f1f28] px-4 py-2 text-white cursor-pointer transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        <UserCard user={user} />

        {!loading && user.id && <Dashboard user={selectedUser} />}

        {!loading && !user.id && (
          <div className="mt-4 text-yellow-200">
            Search a GitHub username to see results.
          </div>
        )}

        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>

      <RecentUser
        onSelectUsername={handleRecentSelect}
        recentVersion={recentVersion}
      />
    </>
  );
}

export default Profile;
