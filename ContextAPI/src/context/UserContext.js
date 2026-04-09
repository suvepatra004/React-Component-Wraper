import React from "react";

// Create a glogal context
const UserContext = React.createContext();

// Export the Context variable
export default UserContext;

// Then the Provide comes up to Privide the value to those components
{
  /* Wrap all the Components inside <UserContext/> */
}
{
  /* Basically the UserContext provide the state values to those Components specifically */
}
{
  /* Those wraped Components can Directly access the values from UserContext */
}
{
  /* <UserContext>
    <UserData />
    <Login />
    <User />
  </UserContext> */
}
