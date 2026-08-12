import React from "react";

const Dashboard = ({ user }) => {
  return (
    <div>
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

        <table className="mt-4 w-full table-fixed border-separate border-spacing-y-2 text-left wrap-break-words">
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
    </div>
  );
};

export default Dashboard;
