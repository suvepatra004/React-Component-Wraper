import React from "react";

const UserCard = ({ user }) => {
  return (
    <button className="cursor-pointer mt-4 bg-amber-50 rounded-md">
      <div className="flex flex-row gap-1.5 p-2">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="size-10 object-cover rounded-sm"
          loading="lazy"
        />
        <h2 id="user-card-name" className="text-zinc-900 text-xl font-semibold">
          {user.login}
        </h2>
      </div>
    </button>
  );
};

export default UserCard;
