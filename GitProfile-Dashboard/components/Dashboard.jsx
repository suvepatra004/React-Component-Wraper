import React, { useEffect, useState } from "react";

const Dashboard = ({ user }) => {
  const [profile, setProfile] = useState(user || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const login = user?.login;
    if (!login) return;

    let cancelled = false;

    const fetchFullProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/users/${login}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!cancelled) setProfile(data);
      } catch (e) {
        if (!cancelled) setProfile({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFullProfile();

    return () => {
      cancelled = true;
    };
  }, [user?.login]);

  const p = profile; // alias to keep your JSX unchanged

  return (
    <div>
      <div className="mt-4">
        {loading ? (
          <div className="text-red-400">Loading...</div>
        ) : (
          <>
            {p.avatar_url && (
              <img
                src={p.avatar_url}
                alt={`${p.login}'s avatar`}
                loading="lazy"
                width={120}
                height={120}
                className="h-24 w-24 rounded-md object-cover sm:h-30 sm:w-30"
              />
            )}

            <table className="mt-4 w-full table-fixed border-separate border-spacing-y-2 text-left wrap-break-words">
              <tbody>
                <tr>
                  <td className="w-28 font-medium sm:w-32">User Name</td>
                  <td>{p.login}</td>
                </tr>

                <tr>
                  <td className="font-medium">Name</td>
                  <td>{p.name ?? "N/A"}</td>
                </tr>

                <tr>
                  <td className="font-medium">Company</td>
                  <td>{p.company ?? "N/A"}</td>
                </tr>

                <tr>
                  <td className="font-medium">Followers</td>
                  <td>{p.followers ?? "N/A"}</td>
                </tr>

                <tr>
                  <td className="font-medium align-top">Bio</td>
                  <td>{p.bio ?? "N/A"}</td>
                </tr>
              </tbody>
            </table>

            {p.html_url && (
              <a
                href={p.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${p.login}'s GitHub profile`}
                className="mt-4 inline-block rounded-md border border-white bg-[#1f1f28] px-4 py-2 text-white transition-colors hover:bg-gray-700"
              >
                Visit Profile
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
