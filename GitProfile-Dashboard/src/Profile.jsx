import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({});
  const [findUser, setFindUser] = useState("");
  const [loading, setLoading] = useState(false);
  //   useEffect(() => {
  //     fetch(`https://api.github.com/users/${findUser}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUser(data);
  //       });
  //   }, [findUser]);
  const fetchUser = () => {
    fetch(`https://api.github.com/users/${findUser}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          return `<h2>User data unavailable</h2>`;
        }
        if (data.message === "Not Found") {
          return `<h2>User data not found</h2>`;
        }
        setUser(data);
      });
  };

  return (
    <>
      <div className="container w-full max-w-2xl bg-gray-800 rounded-2xl p-4">
        <form
          className="w-full max-w-2xl mx-auto flex gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            name="searchUser"
            value={findUser}
            onChange={(e) => setFindUser(e.target.value)}
            placeholder="Search GitHub user..."
            className="flex-1 rounded-md bg-amber-50 px-4 py-1 text-gray-800 outline-none"
          />

          <button
            type="submit"
            className="rounded-md bg-[#1f1f28] border border-white px-2 py-1 text-white cursor-pointer"
            onClick={fetchUser}
          >
            Search
          </button>
        </form>
        <div className="git-user-profile m-2 p-2">
          {user.avatar_url && (
            <img
              src={user.avatar_url}
              alt="avatar image"
              className="size-30 rounded-md"
            />
          )}
          <table className="w-full table-fixed border-separate border-spacing-y-2 text-left">
            <tbody>
              <tr id="username">
                <td className="w-32 font-medium">User Name</td>
                <td>{user.login}</td>
              </tr>
              <tr id="name">
                <td className="font-medium">Name</td>
                <td>{user.name}</td>
              </tr>
              {/* <tr>
                <td className="font-medium">Email</td>
                <td>
                  <p>{user.email}</p>
                </td>
              </tr> */}
              <tr id="company">
                <td className="font-medium">Company</td>
                <td>{user.company}</td>
              </tr>
              <tr id="followers">
                <td className="font-medium">Followers</td>
                <td>{user.followers}</td>
              </tr>
              <tr id="bio">
                <td className="font-medium align-top">Bio</td>
                <td>{user.bio}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Profile;

/**
 * {
  "login": "suvepatra004",
  "id": 108013600,
  "node_id": "U_kgDOBnAoIA",
  "avatar_url": "https://avatars.githubusercontent.com/u/108013600?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/suvepatra004",
  "html_url": "https://github.com/suvepatra004",
  "followers_url": "https://api.github.com/users/suvepatra004/followers",
  "following_url": "https://api.github.com/users/suvepatra004/following{/other_user}",
  "gists_url": "https://api.github.com/users/suvepatra004/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/suvepatra004/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/suvepatra004/subscriptions",
  "organizations_url": "https://api.github.com/users/suvepatra004/orgs",
  "repos_url": "https://api.github.com/users/suvepatra004/repos",
  "events_url": "https://api.github.com/users/suvepatra004/events{/privacy}",
  "received_events_url": "https://api.github.com/users/suvepatra004/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Suvendu  Kumar Patra",
  "company": "Accenture",
  "blog": "https://github.com/suvepatra004",
  "location": "Odisha",
  "email": null,
  "hireable": null,
  "bio": "Ex-Accenture | Product Builder | Frontend Developer | Vibe Coder | Solving Problems through my AI Product Building journey.",
  "twitter_username": null,
  "public_repos": 25,
  "public_gists": 0,
  "followers": 4,
  "following": 9,
  "created_at": "2022-06-22T15:17:57Z",
  "updated_at": "2026-06-04T17:31:48Z"
}
 */
