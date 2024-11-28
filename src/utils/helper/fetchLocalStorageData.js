export const fetchLocalStorageData = () => {
  const user = localStorage.getItem("logedinUser");
  return JSON.parse(user);
};
