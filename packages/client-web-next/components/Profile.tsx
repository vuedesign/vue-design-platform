import useUser from "./hooks/useUser";

const Profile = () => {
  // Fetch the user client-side
  const { user, isLoggedIn } = useUser({ redirectTo: "/login" });

  // Server-render loading state
  if (!user || isLoggedIn === false) {
    return <div>Loading...</div>;
  }

  // Once the user request finishes, show the user
  return <div>{user && user.email}</div>;
};

export default Profile;
