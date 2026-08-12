import React, { useEffect, useState } from "react";
import historyIcon from "../assets/recently.png";

const RecentUser = ({ onSelectUsername, recentVersion }) => {
  const [recentUser, setRecentUser] = useState([]);

  const loadFromStorage = () => {
    const storedHistory = localStorage.getItem("history");
    if (!storedHistory) {
      setRecentUser([]);
      return;
    }

    try {
      const { users, timestamp } = JSON.parse(storedHistory);
      const FIVE_MINUTES = 5 * 60 * 1000;

      if (Date.now() - timestamp > FIVE_MINUTES) {
        localStorage.removeItem("history");
        setRecentUser([]);
        return;
      }

      setRecentUser(Array.isArray(users) ? users : []);
    } catch {
      localStorage.removeItem("history");
      setRecentUser([]);
    }
  };

  useEffect(() => {
    loadFromStorage();
  }, [recentVersion]);

  return (
    <div className="w-full">
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
                onClick={() => onSelectUsername?.(prev)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectUsername?.(prev);
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
    </div>
  );
};

export default RecentUser;
