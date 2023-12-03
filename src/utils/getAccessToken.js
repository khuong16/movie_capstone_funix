export const getAccessToken = () => {
  const user = localStorage.getItem("User");
  if (!user) return "";
  return JSON.parse(user)?.accessToken;
};
