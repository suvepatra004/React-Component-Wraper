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
  const [selectedUser, setSelectedUser] = useState(null);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = async () => {
    const query = findUser.trim();
    if (!query) return;
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10&page=${page + 1}`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      const newItems = Array.isArray(data.items) ? data.items : [];
      setResults((prev) => [...prev, ...newItems]);

      // GitHub search gives total_count (string/number). Use it to decide more pages.
      const totalCount = Number(data.total_count ?? 0);
      const nextCount = (page + 1) * 10;

      setHasMore(nextCount < totalCount);
      setPage((p) => p + 1);
    } catch (e) {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

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
        `https://api.github.com/search/users?q=${userName}&per_page=6&page=1`,
        // `https://api.github.com/users/${userName}`,
      );

      if (res.total_count === 0) {
        setUser({});
        setError("User Not Found");
        return null;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (!data) return;

      setResults(data.items || []);
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
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-cyan-950 p-4">
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

        {/* Dashboard view */}
        {selectedUser && <Dashboard user={selectedUser} />}

        {/* Idle State message */}
        {!loading && (!results || results.length === 0) && (
          <div className="mt-4 text-yellow-200">
            Search a GitHub username to see results.
          </div>
        )}

        {/* Error message display */}
        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>

      {/* UserCard profiles */}
      {results?.length > 0 && (
        <div className="mx-auto mt-4 w-full max-w-2xl rounded-2xl bg-cyan-950 p-4">
          <h2 className="mb-3 text-lg font-semibold text-white">
            Search Results
          </h2>
          {/* row-wise bento */}
          <div className="flex flex-wrap justify-start gap-2">
            {results.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                onSelect={(selected) => setSelectedUser(selected)}
              />
            ))}
          </div>
          {/* load more below */}
          <div className="mt-4">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="rounded-md border shadow-2xl bg-yellow-200 px-4 py-2 text-slate-800 font-bold transition-colors hover:bg-yellow-100 disabled:opacity-50 cursor-pointer"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          </div>
        </div>
      )}

      <RecentUser
        onSelectUsername={handleRecentSelect}
        recentVersion={recentVersion}
      />
    </>
  );
}

export default Profile;
