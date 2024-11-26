

  export const authHeader = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  };
  