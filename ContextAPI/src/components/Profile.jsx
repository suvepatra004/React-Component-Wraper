import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <>{user ? <div>Welcome {user.userName}</div> : <div>Please Login</div>}</>
  );
}

export default Profile;
