import React, { useEffect, useState } from "react";
import historyIcon from "../assets/recently.png";

/**
 *
 * TODO:
 * @V2
 * [Done] User Not Found error fix (error displaying after correct user fetch)
 * [Done] Search bar visible Only, when typing the username.
 *
 * @V3
 * [] More Error handling (API authorization, api call limits)
 * [Done] use of Axios/react-query/react-swr instead of Fetch API call
 * [Done] Add recent 5 search history (storing in LocalStorage)
 *
 * ADD:
 * [Done] Is username empty check (search bar) (previous fetched user profile is present or not)
 * [Done] Is user found after fetch request (No, Hide profile then Show "User not found")
 * [Done] Is user found after fetch request (Yes, Clear previous error + user profile then Show user Profile)
 */

function Profile() {
  const [user, setUser] = useState({});
  const [findUser, setFindUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentUser, setRecentUser] = useState([]);

  const addRecentUser = (username) => {
    const gitUser = username.trim();
    // Eliminate Duplicates
    const filteredHistory = recentUser.filter((user) => user !== gitUser);
    // Add fitered users
    const updatedHistory = [gitUser, ...filteredHistory].slice(0, 5);

    // Store to the localstorage
    setRecentUser(updatedHistory);
    localStorage.setItem(
      "history",
      JSON.stringify({
        users: updatedHistory,
        timestamp: Date.now(),
      }),
    );
  };


  useEffect(() => {
    const storedHistory = localStorage.getItem("history");

    if (!storedHistory) return;

    try {
      const { users, timestamp } = JSON.parse(storedHistory);

      const FIVE_MINUTES = 5 * 60 * 1000;

      if (Date.now() - timestamp > FIVE_MINUTES) {
        localStorage.removeItem("history");
        setRecentUser([]);
        return;
      }

      setRecentUser(users);
    } catch (err) {
      localStorage.removeItem("history");
      setRecentUser([]);
    }
  }, []);

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
      const res = await fetch(`https://api.github.com/users/${userName}`);

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

        {!loading && user.id && (
          <div className="mt-4">
            {user.avatar_url && (
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                loading="lazy"
                width={120}
                height={120}
                className="h-24 w-24 rounded-md object-cover sm:h-30 sm:w-30"
              />
            )}

            <table className="mt-4 w-full table-fixed border-separate border-spacing-y-2 text-left break-words">
              <tbody>
                <tr>
                  <td className="w-28 font-medium sm:w-32">User Name</td>
                  <td>{user.login}</td>
                </tr>

                <tr>
                  <td className="font-medium">Name</td>
                  <td>{user.name ?? "N/A"}</td>
                </tr>

                <tr>
                  <td className="font-medium">Company</td>
                  <td>{user.company ?? "N/A"}</td>
                </tr>

                <tr>
                  <td className="font-medium">Followers</td>
                  <td>{user.followers ?? "N/A"}</td>
                </tr>

                <tr>
                  <td className="font-medium align-top">Bio</td>
                  <td>{user.bio ?? "N/A"}</td>
                </tr>
              </tbody>
            </table>

            {user.html_url && (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${user.login}'s GitHub profile`}
                className="mt-4 inline-block rounded-md border border-white bg-[#1f1f28] px-4 py-2 text-white transition-colors hover:bg-gray-700"
              >
                Visit Profile
              </a>
            )}
          </div>
        )}

        {!loading && !user.id && (
          <div className="mt-4 text-gray-200">Search a GitHub username to see results.</div>
        )}


        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>

      {recentUser.length > 0 && (
        <div className="mx-auto mt-4 w-full max-w-2xl rounded-2xl bg-gray-800 p-4">
          <h2 className="mb-3 text-lg font-semibold text-white">
            Recent Searches
          </h2>

          <div className="space-y-2">
            {recentUser.map((prev) => (
              <div
                key={prev}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setFindUser(prev);
                  fetchUser(prev);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setFindUser(prev);
                    fetchUser(prev);
                  }
                }}
                className="flex w-fit cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <img
                  src={historyIcon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={16}
                  height={16}
                  className="h-4 w-4 brightness-0 invert opacity-80"
                />

                <span>{prev}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
