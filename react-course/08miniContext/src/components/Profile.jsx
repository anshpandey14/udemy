import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <h1>Not Loggen In</h1>;
  }
  return (
    <div>
      Profile : {user.username}
      <h1>More component</h1>
    </div>
  );
}

export default Profile;
