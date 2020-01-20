const requireAuth = (props) => {
  if (!localStorage.getItem("token")) {
    props.history.push("/login");
    return false;
  }
  return true;
};

export default {
  requireAuth
};
