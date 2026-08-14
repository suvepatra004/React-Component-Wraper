import React from "react";

const UserCard = ({ user, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(user)}
      className="cursor-pointer mt-4 bg-amber-50/80 border-white rounded-md flex flex-row"
    >
      <div className="p-2">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="size-10 object-cover rounded-sm"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="min-w-0 px-4 flex flex-col justify-center">
        <h2 id="user-card-name" className="text-zinc-900 text-xl font-semibold">
          {user.login}
        </h2>

        {user.id ? (
          <div className="text-xs text-black truncate">{user.id}</div>
        ) : (
          <div className="text-xs text-black truncate">Profile</div>
        )}
      </div>
    </button>
  );
};

export default UserCard;
